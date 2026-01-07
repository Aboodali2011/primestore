let codes = global.__PRIME_CODES || (global.__PRIME_CODES = new Map());

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
}

exports.handler = async (event) => {
  const headers = cors();
  try {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

    const { email, code } = JSON.parse(event.body || '{}');
    const to = String(email || '').trim().toLowerCase();
    const c = String(code || '').trim();

    if (!to || !to.includes('@') || !c) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid payload' }) };

    const rec = codes.get(to);
    if (!rec) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Code not found' }) };
    if (Date.now() > rec.expiresAt) { codes.delete(to); return { statusCode: 400, headers, body: JSON.stringify({ error: 'Code expired' }) }; }
    if (String(rec.code) !== c) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid code' }) };

    // success
    codes.delete(to);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
