const { signToken, cors } = require('./_auth');

exports.handler = async (event) => {
  const headers = cors();
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers, body: '' };
    }
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const password = process.env.ADMIN_PASSWORD || '';
    if (!password) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Admin password not set' }) };
    }

    const payload = JSON.parse(event.body || '{}');
    const provided = String(payload.password || '').trim();

    if (!provided || provided !== password) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid password' }) };
    }

    const token = signToken({ role: 'admin' }, 60 * 60 * 12); // 12 hours
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, token }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
