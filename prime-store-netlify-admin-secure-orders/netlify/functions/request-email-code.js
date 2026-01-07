const crypto = require('crypto');
const nodemailer = require('nodemailer');

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP settings');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

function computeCode(email, bucket) {
  const secret = process.env.EMAIL_CODE_SECRET || process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error('Missing EMAIL_CODE_SECRET (or ADMIN_TOKEN_SECRET)');
  const h = crypto.createHmac('sha256', secret).update(`${email}|${bucket}`).digest();
  // Turn first 4 bytes into a number, then mod 1,000,000
  const num = h.readUInt32BE(0) % 1000000;
  return String(num).padStart(6, '0');
}

exports.handler = async (event) => {
  const headers = cors();
  try {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

    const { email } = JSON.parse(event.body || '{}');
    const to = String(email || '').trim().toLowerCase();
    if (!to || !to.includes('@')) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) };

    const windowMs = 10 * 60 * 1000; // 10 minutes
    const bucket = Math.floor(Date.now() / windowMs);
    const code = computeCode(to, bucket);

    const storeName = process.env.STORE_NAME || 'Prime Store';
    const from = process.env.SMTP_FROM || process.env.STORE_EMAIL || process.env.SMTP_USER;

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `${storeName} <${from}>`,
      to,
      subject: `Your verification code — ${storeName}`,
      text: `Your verification code is: ${code}\n\nThis code expires in 10 minutes.`,
      html: `<div style="font-family:Arial,sans-serif">
        <h3>${storeName}</h3>
        <p>Your verification code is:</p>
        <div style="font-size:28px;font-weight:700;letter-spacing:2px;margin:10px 0">${code}</div>
        <p style="color:#666">This code expires in 10 minutes.</p>
      </div>`
    });

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
