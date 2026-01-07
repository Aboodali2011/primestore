let codes = global.__PRIME_CODES || (global.__PRIME_CODES = new Map());

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
}

const nodemailer = require('nodemailer');

function getTransporter(){
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) throw new Error('Missing SMTP settings (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS)');
  return nodemailer.createTransport({
    host, port,
    secure: port === 465,
    auth: { user, pass }
  });
}

function genCode(){
  return String(Math.floor(100000 + Math.random()*900000)); // 6 digits
}

exports.handler = async (event) => {
  const headers = cors();
  try {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

    const { email } = JSON.parse(event.body || '{}');
    const to = String(email || '').trim().toLowerCase();
    if (!to || !to.includes('@')) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) };

    const code = genCode();
    const expiresAt = Date.now() + 10*60*1000;
    codes.set(to, { code, expiresAt });

    const from = process.env.STORE_EMAIL || process.env.SMTP_FROM || process.env.SMTP_USER;
    const storeName = process.env.STORE_NAME || 'Prime Store';

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `${storeName} <${from}>`,
      to,
      subject: `Your verification code — ${storeName}`,
      text: `Your verification code is: ${code}\n\nThis code expires in 10 minutes.`,
      html: `<div style="font-family:Arial,sans-serif"><h3>${storeName}</h3><p>Your verification code is:</p><p style="font-size:24px;letter-spacing:2px"><strong>${code}</strong></p><p style="color:#666">This code expires in 10 minutes.</p></div>`
    });

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
