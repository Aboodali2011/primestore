const crypto = require('crypto');

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
}

function computeCode(email, bucket) {
  const secret = process.env.EMAIL_CODE_SECRET || process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error('Missing EMAIL_CODE_SECRET (or ADMIN_TOKEN_SECRET)');
  const h = crypto.createHmac('sha256', secret).update(`${email}|${bucket}`).digest();
  const num = h.readUInt32BE(0) % 1000000;
  return String(num).padStart(6, '0');
}

exports.handler = async (event) => {
  const headers = cors();
  try {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

    const { email, code } = JSON.parse(event.body || '{}');
    const to = String(email || '').trim().toLowerCase();
    const c = String(code || '').trim();

    if (!to || !to.includes('@') || !c) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid payload' }) };
    }

    const windowMs = 10 * 60 * 1000; // 10 minutes
    const bucket = Math.floor(Date.now() / windowMs);

    // Accept current bucket and previous bucket (grace period)
    const expectedNow = computeCode(to, bucket);
    const expectedPrev = computeCode(to, bucket - 1);

    if (c !== expectedNow && c !== expectedPrev) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid code' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
