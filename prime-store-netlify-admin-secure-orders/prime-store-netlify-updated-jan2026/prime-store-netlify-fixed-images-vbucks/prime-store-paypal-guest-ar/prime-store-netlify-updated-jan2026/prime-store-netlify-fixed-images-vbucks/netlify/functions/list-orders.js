const https = require('https');
const { verifyToken, extractToken, cors } = require('./_auth');

function requestJson(url, accessToken) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const opts = {
      method: 'GET',
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'primestore-netlify-functions',
        'Accept': 'application/json'
      }
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        let parsed = null;
        try { parsed = data ? JSON.parse(data) : null; } catch {}
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(parsed);
        } else {
          const msg = (parsed && (parsed.message || parsed.error)) || data || `HTTP ${res.statusCode}`;
          reject(new Error(msg));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

exports.handler = async (event) => {
  const headers = cors();
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers, body: '' };
    }
    // auth
    const token = extractToken(event.headers);
    const v = verifyToken(token);
    if (!v.ok) return { statusCode: 401, headers, body: JSON.stringify({ error: v.error }) };

    const accessToken = process.env.NETLIFY_ACCESS_TOKEN || '';
    if (!accessToken) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing NETLIFY_ACCESS_TOKEN env var' }) };
    }

    const siteId = process.env.SITE_ID || process.env.NETLIFY_SITE_ID || '';
    if (!siteId) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing SITE_ID / NETLIFY_SITE_ID env var' }) };
    }

    const formName = (event.queryStringParameters && event.queryStringParameters.form) ? String(event.queryStringParameters.form) : 'orders';
    const limit = Math.min(100, Math.max(1, Number((event.queryStringParameters && event.queryStringParameters.limit) || 50)));

    // Find form ID by name
    const forms = await requestJson(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, accessToken);
    const form = Array.isArray(forms) ? forms.find(f => String(f.name || '').toLowerCase() === String(formName).toLowerCase()) : null;
    if (!form || !form.id) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: `Form '${formName}' not found` }) };
    }

    // List submissions
    const subs = await requestJson(`https://api.netlify.com/api/v1/forms/${form.id}/submissions?per_page=${limit}`, accessToken);
    const items = Array.isArray(subs) ? subs.map(s => ({
      id: s.id,
      created_at: s.created_at,
      data: s.data || {}
    })) : [];

    items.sort((a,b) => (b.created_at || '').localeCompare(a.created_at || ''));

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, form: { id: form.id, name: form.name }, submissions: items }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
