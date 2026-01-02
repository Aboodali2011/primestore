const nodemailer = require('nodemailer');

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

function buildItemsHtml(items) {
  const rows = (items || []).map((it) => {
    const price = Number(it.price || 0).toFixed(2);
    const qty = Number(it.quantity || 1);
    const line = (Number(it.price || 0) * qty).toFixed(2);
    return `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #eee;">${esc(it.name)}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${qty}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">$${price}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">$${line}</td>
      </tr>`;
  }).join('');

  return `
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;padding:10px;border-bottom:2px solid #eee;">Item</th>
          <th style="text-align:center;padding:10px;border-bottom:2px solid #eee;">Qty</th>
          <th style="text-align:right;padding:10px;border-bottom:2px solid #eee;">Price</th>
          <th style="text-align:right;padding:10px;border-bottom:2px solid #eee;">Line total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function buildText(order) {
  const lines = [];
  lines.push('Prime Store Invoice (Pending)');
  lines.push('---------------------------');
  lines.push(`Order ID: ${order.orderId}`);
  lines.push(`Customer: ${order.name || ''}`);
  lines.push(`Email: ${order.email || ''}`);
  if (order.contactValue) lines.push(`Contact (${order.contactType || 'phone'}): ${order.contactValue}`);
  lines.push('');
  lines.push('Items:');
  (order.items || []).forEach((it) => {
    lines.push(`- ${it.name} x${it.quantity} ($${Number(it.price || 0).toFixed(2)})`);
  });
  lines.push('');
  if (order.subtotal) lines.push(`Subtotal: $${order.subtotal}`);
  if (order.discountCode && Number(order.discountAmount) > 0) lines.push(`Discount (${order.discountCode}): -$${order.discountAmount}`);
  lines.push(`Total: $${order.total}`);
  lines.push('');
  lines.push('Status: PENDING');
  if (order.notes) {
    lines.push('');
    lines.push('Notes:');
    lines.push(order.notes);
  }
  return lines.join('\n');
}

function buildHtml(order) {
  const itemsHtml = buildItemsHtml(order.items);
  const discountLine = (order.discountCode && Number(order.discountAmount) > 0)
    ? `<div style="display:flex;justify-content:space-between;gap:10px;"><span>Discount (${esc(order.discountCode)}):</span><strong>-$${esc(order.discountAmount)}</strong></div>`
    : '';

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:700px;margin:0 auto;">
    <h2 style="margin:0 0 6px;">Prime Store</h2>
    <p style="margin:0 0 18px;color:#555;">Invoice status: <strong>PENDING</strong></p>

    <div style="padding:14px 16px;border:1px solid #eee;border-radius:12px;margin-bottom:16px;">
      <div><strong>Order ID:</strong> ${esc(order.orderId)}</div>
      <div><strong>Customer:</strong> ${esc(order.name || '')}</div>
      <div><strong>Email:</strong> ${esc(order.email || '')}</div>
      ${order.contactValue ? `<div><strong>Contact (${esc(order.contactType || 'phone')}):</strong> ${esc(order.contactValue)}</div>` : ''}
      ${order.channel ? `<div><strong>Checkout channel:</strong> ${esc(order.channel)}</div>` : ''}
    </div>

    ${itemsHtml}

    <div style="margin-top:16px;padding:14px 16px;border:1px solid #eee;border-radius:12px;">
      ${order.subtotal ? `<div style="display:flex;justify-content:space-between;gap:10px;"><span>Subtotal:</span><strong>$${esc(order.subtotal)}</strong></div>` : ''}
      ${discountLine}
      <div style="display:flex;justify-content:space-between;gap:10px;margin-top:8px;font-size:18px;">
        <span>Total:</span>
        <strong>$${esc(order.total)}</strong>
      </div>
    </div>

    ${order.notes ? `<p style="margin-top:14px;"><strong>Notes:</strong> ${esc(order.notes)}</p>` : ''}

    <p style="margin-top:18px;color:#555;">We will contact you shortly to confirm delivery.</p>
  </div>`;
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const payload = JSON.parse(event.body || '{}');
    const order = payload.order || payload;

    if (!order || !order.orderId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing order' }) };
    }

    const to = String(order.email || '').trim();
    if (!to || !to.includes('@')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing customer email' }) };
    }

    const storeEmail = process.env.STORE_EMAIL || 'okashahprimestore@gmail.com';
    const from = process.env.SMTP_FROM || storeEmail;

    const transporter = getTransport();

    const subject = `Prime Store Invoice (Pending) — ${order.orderId}`;

    await transporter.sendMail({
      from,
      to,
      cc: storeEmail,
      replyTo: storeEmail,
      subject,
      text: buildText(order),
      html: buildHtml(order)
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
