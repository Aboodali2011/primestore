const crypto = require('crypto');

function base64url(input) {
  return Buffer.from(input).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function unbase64url(input) {
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  return Buffer.from(b64 + pad, 'base64').toString('utf8');
}

function getSecret() {
  return process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD || '';
}

function signToken(payloadObj, ttlSeconds = 60 * 60 * 8) { // 8 hours default
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    ...payloadObj,
    iat: now,
    exp: now + ttlSeconds
  };
  const payloadB64 = base64url(JSON.stringify(payload));
  const secret = getSecret();
  const sig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${payloadB64}.${sig}`;
}

function verifyToken(token) {
  if (!token) return { ok: false, error: 'Missing token' };
  const secret = getSecret();
  if (!secret) return { ok: false, error: 'Missing server secret' };

  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, error: 'Invalid token format' };
  const [payloadB64, sig] = parts;

  const expected = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const sigOk = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!sigOk) return { ok: false, error: 'Invalid token signature' };

  let payload;
  try {
    payload = JSON.parse(unbase64url(payloadB64));
  } catch {
    return { ok: false, error: 'Invalid token payload' };
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now > payload.exp) return { ok: false, error: 'Token expired' };

  return { ok: true, payload };
}

function extractToken(headers = {}) {
  const h = headers || {};
  const auth = h.authorization || h.Authorization || '';
  if (auth && auth.toLowerCase().startsWith('bearer ')) return auth.slice(7).trim();
  return h['x-admin-token'] || h['X-Admin-Token'] || '';
}

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Token',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
}

module.exports = { signToken, verifyToken, extractToken, cors };
