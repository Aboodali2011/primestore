const nodemailer = require('nodemailer');
const { verifyToken, extractToken, cors } = require('./_auth');

function getTransport() {
  const url = process.env.SMTP_URL;
  if (url) return nodemailer.createTransport(url);

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '465');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP settings. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (or SMTP_URL).');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

exports.handler = async (event) => {
  const headers = cors();
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers, body: '' };
    }
    // Admin auth
    const token = extractToken(event.headers);
    const v = verifyToken(token);
    if (!v.ok) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const payload = JSON.parse(event.body || '{}');
    const orderId = String(payload.orderId || '').trim();
    const to = String(payload.customerEmail || payload.email || '').trim();
    const note = String(payload.note || '').trim();

    if (!orderId) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing orderId' }) };
    if (!to || !to.includes('@')) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing customerEmail' }) };

    const storeEmail = process.env.STORE_EMAIL || 'okashahprimestore@gmail.com';
    const from = process.env.SMTP_FROM || storeEmail;

    const transporter = getTransport();

    const subject = `Prime Store — Delivered — ${orderId}`;

    const text = [
      'Your order has been delivered.',
      `Order ID: ${orderId}`,
      note ? `Note: ${note}` : '',
      '',
      'Thank you for shopping with Prime Store.'
    ].filter(Boolean).join('\n');

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:700px;margin:0 auto;">
        <h2 style="margin:0 0 6px;">Prime Store</h2>
        <p style="margin:0 0 18px;color:#555;">Order status: <strong>DELIVERED</strong></p>
        <div style="padding:14px 16px;border:1px solid #eee;border-radius:12px;">
          <div><strong>Order ID:</strong> ${esc(orderId)}</div>
          ${note ? `<div style="margin-top:8px;"><strong>Note:</strong> ${esc(note)}</div>` : ''}
        </div>
        <p style="margin-top:18px;color:#555;">Thank you for shopping with Prime Store.</p>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      cc: storeEmail,
      replyTo: storeEmail,
      subject,
      text,
      html
    });

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
