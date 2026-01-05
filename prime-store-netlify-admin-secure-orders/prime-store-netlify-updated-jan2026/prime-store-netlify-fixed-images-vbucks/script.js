
/* ====== LANGUAGE (AR/EN) ====== */
let currentLang = "en";

function getProductDesc(p){
  // Supports old `description` and bilingual `descEn/descAr`
  if(currentLang==='ar'){
    return p.descAr || p.descriptionAr || p.description || p.descEn || '';
  }
  return p.descEn || p.descriptionEn || p.description || p.descAr || '';
}
function getProductDelivery(p){
  if(currentLang==='ar') return p.deliveryAr || p.delivery || p.deliveryEn || '';
  return p.deliveryEn || p.delivery || p.deliveryAr || '';
}
function getProductFeatures(p){
  const f = (currentLang==='ar' ? (p.featuresAr || p.features) : (p.featuresEn || p.features));
  if(!f) return '';
  if(Array.isArray(f)) return f.map(x=>`<li>${x}</li>`).join('');
  return String(f).split('\n').filter(Boolean).map(x=>`<li>${x}</li>`).join('');
}

function t(en) {
  return en;
}
function setLang(){
  // Site is English-only
  currentLang = "en";
  document.documentElement.setAttribute("lang", "en");
  document.documentElement.setAttribute("dir", "ltr");
  try { renderProducts(); } catch(e){}
  try { renderCart(); } catch(e){}
}
// Products Data
const products = [
    // YouTube
    {
        id: 1,
        name: 'YouTube Premium (1 Month)',
        description: `
            <ul>
                <li>Instant activation ⚡</li>
                <li>Full guarantee for the whole period 🔒</li>
                <li>100% guaranteed ✅</li>
                <li>Replacement if any issue 🔁</li>
            </ul>
        `,
        price: 5,
        image: 'YouTube_full-color_icon_2017.svg.png',
        category: 'Subscriptions'
    },
    {
        id: 2,
        name: 'YouTube Premium (3 Months)',
        description: `
            <ul>
                <li>Instant activation ⚡</li>
                <li>Full guarantee for the whole period 🔒</li>
                <li>100% guaranteed ✅</li>
                <li>Replacement if any issue 🔁</li>
            </ul>
        `,
        price: 18,
        available: false,
        image: 'YouTube_full-color_icon_2017.svg.png',
        category: 'Subscriptions'
    },
    {
        id: 3,
        name: 'YouTube Premium (1 Year)',
        description: `
            <ul>
                <li>Instant activation ⚡</li>
                <li>Full guarantee for the whole period 🔒</li>
                <li>100% guaranteed ✅</li>
                <li>Replacement if any issue 🔁</li>
            </ul>
        `,
        price: 25,
        image: 'YouTube_full-color_icon_2017.svg.png',
        category: 'Subscriptions'
    },

    // Netflix
    {
        id: 4,
        name: 'Netflix (Shared Profile)',
        description: `
            <ul>
                <li>Guarantee 25–30 days 🔒</li>
                <li>Instant delivery ⚡</li>
                <li>Legal subscription ✅</li>
                <li>Replacement if any issue 🔁</li>
            </ul>
        `,
        price: 3,
        image: 'BrandAssets_Logos_02-NSymbol.jpg',
        category: 'Subscriptions'
    },
    {
        id: 5,
        name: 'Netflix (Full Account)',
        description: `
            <ul>
                <li>Guarantee 25–30 days 🔒</li>
                <li>Instant delivery ⚡</li>
                <li>Legal subscription ✅</li>
                <li>Replacement if any issue 🔁</li>
            </ul>
        `,
        price: 9,
        image: 'BrandAssets_Logos_02-NSymbol.jpg',
        category: 'Subscriptions'
    },
    {
        id: 6,
        name: 'Netflix (Private Profile)',
        description: `
            <ul>
                <li>Guarantee 25–30 days 🔒</li>
                <li>Instant delivery ⚡</li>
                <li>Legal subscription ✅</li>
                <li>Replacement if any issue 🔁</li>
            </ul>
        `,
        price: 5.5,
        image: 'BrandAssets_Logos_02-NSymbol.jpg',
        category: 'Subscriptions'
    },

    // ChatGPT
    {
        id: 7,
        name: 'ChatGPT Subscription (1 Month • Personal Account)',
        description: `
            <div style="margin-bottom: .6rem; font-weight: 700;">Features ✨</div>
            <ul>
                <li>Guarantee 25–30 days 🔒</li>
                <li>Instant delivery ⚡</li>
                <li>Legal subscription ✅</li>
                <li>Replacement if any issue 🔁</li>
            </ul>
            <div style="margin: .8rem 0 .4rem; font-weight: 700;">Rules 📜</div>
            <ul>
                <li>No illegal usage ❌</li>
                <li>Do not change account settings ⚙️</li>
                <li>Do not share account info 🔒</li>
                <li>Breaking rules = warranty canceled + account permanently stopped 🚫</li>
            </ul>
        `,
        price: 3,
        image: '1681039084chatgpt-icon.png',
        category: 'Subscriptions'
    },

    // IPTV
    {
        id: 8,
        name: 'IPTV 4K (1 Month)',
        description: `
            <ul>
                <li>Instant activation & delivery ⚡</li>
                <li>Works on all devices</li>
                <li>Legal subscription ✅</li>
                <li>Full guarantee for the whole subscription 🔒</li>
            </ul>
        `,
        price: 5,
        image: 'unnamed.png',
        category: 'IPTV'
    },
    {
        id: 9,
        name: 'IPTV 4K (3 Months)',
        description: `
            <ul>
                <li>Instant activation & delivery ⚡</li>
                <li>Works on all devices</li>
                <li>Legal subscription ✅</li>
                <li>Full guarantee for the whole subscription 🔒</li>
            </ul>
        `,
        price: 8,
        image: 'unnamed.png',
        category: 'IPTV'
    },
    {
        id: 10,
        name: 'IPTV 4K (12 Months)',
        description: `
            <ul>
                <li>Instant activation & delivery ⚡</li>
                <li>Works on all devices</li>
                <li>Legal subscription ✅</li>
                <li>Full guarantee for the whole subscription 🔒</li>
            </ul>
        `,
        price: 27,
        image: 'unnamed.png',
        category: 'IPTV'
    },

    // FC26
    {
        id: 11,
        name: 'FC26 Standard Edition (PC)',
        description: `
            <ul>
                <li>Epic Games or Steam account</li>
                <li>Fast delivery ⚡</li>
                <li>100% legit accounts ✅</li>
                <li>Safe & trusted purchase 🔒</li>
            </ul>
        `,
        price: 35,
        image: 'c9e2d0018a8e476bb43d47a7.avif',
        category: 'Games'
    },
    {
        id: 12,
        name: 'FC26 Ultimate Edition (PC)',
        description: `
            <ul>
                <li>Epic Games or Steam account</li>
                <li>Fast delivery ⚡</li>
                <li>100% legit accounts ✅</li>
                <li>Safe & trusted purchase 🔒</li>
            </ul>
        `,
        price: 55,
        image: 'c9e2d0018a8e476bb43d47a7.avif',
        category: 'Games'
    },

    // Fortnite
    {
        id: 13,
        name: 'Fortnite V-Bucks (1,000)',
        description: 'V-Bucks top-up for Fortnite account.',
        price: 5,
        image: 'fortnite-battle-royale-xbox-one-v-bucks.jpg',
        category: 'Gaming Cards'
    },
    {
        id: 14,
        name: 'Fortnite V-Bucks (2,800)',
        description: 'V-Bucks top-up for Fortnite account.',
        price: 14,
        image: 'fortnite-battle-royale-xbox-one-v-bucks.jpg',
        category: 'Gaming Cards'
    },
    {
        id: 15,
        name: 'Fortnite V-Bucks (5,000)',
        description: 'V-Bucks top-up for Fortnite account.',
        price: 24,
        image: 'fortnite-battle-royale-xbox-one-v-bucks.jpg',
        category: 'Gaming Cards'
    },
    {
        id: 16,
        name: 'Fortnite V-Bucks (13,500)',
        description: 'V-Bucks top-up for Fortnite account.',
        price: 61,
        image: 'fortnite-battle-royale-xbox-one-v-bucks.jpg',
        category: 'Gaming Cards'
    },

    {
        id: 17,
        name: 'Discord Nitro (1 Month)',
        price: 6,
        category: 'Discord',
        image: 'nitro-gem.jpg',
        descEn: 'Discord Nitro for 1 month. Fast delivery.',
        descAr: 'نيترو ديسكورد لمدة شهر. تسليم سريع.',
        featuresEn: ['Full warranty for the duration', 'Fast delivery', 'Trusted service'],
        featuresAr: ['ضمان كامل طوال المدة', 'تسليم سريع', 'خدمة موثوقة'],
        deliveryEn: 'Instant / Fast',
        deliveryAr: 'فوري / سريع'
    },
    {
        id: 18,
        name: 'Discord Nitro (1 Year)',
        price: 32,
        category: 'Discord',
        image: 'nitro-gem.jpg',
        descEn: 'Discord Nitro for 1 year. Fast delivery.',
        descAr: 'نيترو ديسكورد لمدة سنة. تسليم سريع.',
        featuresEn: ['Full warranty for the duration', 'Fast delivery', 'Trusted service'],
        featuresAr: ['ضمان كامل طوال المدة', 'تسليم سريع', 'خدمة موثوقة'],
        deliveryEn: 'Fast',
        deliveryAr: 'سريع'
    },
    {
        id: 19,
        name: '14x Server Boosts (3 Months)',
        price: 16,
        category: 'Discord',
        image: 'discord-fast.jpg',
        descEn: '14 boosts for 3 months.',
        descAr: '14 بوست لمدة 3 أشهر.',
        featuresEn: ['High quality boosts', 'Fast delivery', 'Trusted service'],
        featuresAr: ['بوستات قوية', 'تسليم سريع', 'خدمة موثوقة'],
        deliveryEn: 'Fast',
        deliveryAr: 'سريع'
    },
    {
        id: 20,
        name: '14x Server Boosts (1 Month)',
        price: 6,
        available: true,
        category: 'Discord',
        image: 'discord-fast.jpg',
        descEn: '14 boosts for 1 month.',
        descAr: '14 بوست لمدة شهر.',
        featuresEn: ['High quality boosts', 'Fast delivery', 'Trusted service'],
        featuresAr: ['بوستات قوية', 'تسليم سريع', 'خدمة موثوقة'],
        deliveryEn: 'Fast',
        deliveryAr: 'سريع'
    },
    {
        id: 21,
        name: 'Discord Members (250)',
        price: 2,
        category: 'Discord',
        image: 'discord-members.jpg',
        descEn: '250 Discord members.',
        descAr: '250 عضو ديسكورد.',
        featuresEn: ['Warranty: 30 days', 'Fast start'],
        featuresAr: ['ضمان: 30 يوم', 'بدء سريع'],
        deliveryEn: 'Fast',
        deliveryAr: 'سريع'
    },
    {
        id: 22,
        name: 'Discord Members (500)',
        price: 4,
        category: 'Discord',
        image: 'discord-members.jpg',
        descEn: '500 Discord members.',
        descAr: '500 عضو ديسكورد.',
        featuresEn: ['Warranty: 30 days', 'Fast start'],
        featuresAr: ['ضمان: 30 يوم', 'بدء سريع'],
        deliveryEn: 'Fast',
        deliveryAr: 'سريع'
    },
    {
        id: 23,
        name: 'Discord Members (750)',
        price: 7,
        category: 'Discord',
        image: 'discord-members.jpg',
        descEn: '750 Discord members.',
        descAr: '750 عضو ديسكورد.',
        featuresEn: ['Warranty: 30 days', 'Fast start'],
        featuresAr: ['ضمان: 30 يوم', 'بدء سريع'],
        deliveryEn: 'Fast',
        deliveryAr: 'سريع'
    },
    {
        id: 24,
        name: 'Discord Members (1000)',
        price: 10,
        category: 'Discord',
        image: 'discord-members.jpg',
        descEn: '1000 Discord members.',
        descAr: '1000 عضو ديسكورد.',
        featuresEn: ['Warranty: 30 days', 'Fast start'],
        featuresAr: ['ضمان: 30 يوم', 'بدء سريع'],
        deliveryEn: 'Fast',
        deliveryAr: 'سريع'
    },
];


// -------------------------
// Cart + Checkout (Pro UX)
// -------------------------

const CART_KEY = 'prime_cart_v1';
const AUTH_KEY = 'prime_auth_v1';

let cart = loadCart();

function loadCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartQty() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}


// -------------------- Discount codes (static) --------------------
const DISCOUNT_CODES = {
  PRIME10: { type: "percent", value: 10, label: "10% off" },
  WELCOME5: { type: "fixed", value: 5, label: "$5 off" },
  SAVE20: { type: "percent", value: 20, max: 10, label: "20% off (max $10)" },
  VIP30: { type: "percent", value: 30, once: true, label: "VIP 30% (one-time)" },
  FREEPACK: { type: "free_only", value: 100, label: "Free on free items only" }
};

let appliedDiscount = loadDiscount();

function loadDiscount() {
  try { return JSON.parse(localStorage.getItem('prime_discount') || 'null') || { code:null, amount:0, label:'' }; }
  catch { return { code:null, amount:0, label:'' }; }
}
function saveDiscount() {
  localStorage.setItem('prime_discount', JSON.stringify(appliedDiscount));
}
function clearDiscount() {
  appliedDiscount = { code:null, amount:0, label:'' };
  saveDiscount();
  syncDiscountInputs();
  renderCart();
  renderCheckoutSummary();
}

function getUserEmail() {
  try {
    const u = JSON.parse(localStorage.getItem('prime_user') || 'null');
    return (u && u.email) ? String(u.email).toLowerCase() : null;
  } catch { return null; }
}
function getUsedDiscountsKey() {
  const email = getUserEmail();
  return email ? `prime_used_discounts_${email}` : 'prime_used_discounts_guest';
}
function isDiscountUsed(code) {
  try {
    const used = JSON.parse(localStorage.getItem(getUsedDiscountsKey()) || '[]');
    return used.includes(code);
  } catch { return false; }
}
function markDiscountUsed(code) {
  try {
    const key = getUsedDiscountsKey();
    const used = JSON.parse(localStorage.getItem(key) || '[]');
    if (!used.includes(code)) used.push(code);
    localStorage.setItem(key, JSON.stringify(used));
  } catch {}
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
}

function computeDiscount(subtotal) {
  if (!appliedDiscount || !appliedDiscount.code) return { amount: 0, label: '' };

  const code = String(appliedDiscount.code).toUpperCase().trim();
  const rule = DISCOUNT_CODES[code];
  if (!rule) return { amount: 0, label: '' };

  // One-time code check (per account if logged in, else per browser)
  if (rule.once && isDiscountUsed(code)) return { amount: 0, label: 'Code already used' };

  // FREEPACK only applies if cart subtotal is 0 (free items) or if all items are marked free
  if (rule.type === 'free_only') {
    // If any item has price > 0 then no discount
    const hasPaidItem = cart.some(i => (i.product.price || 0) > 0);
    if (hasPaidItem) return { amount: 0, label: 'Only for free items' };
    return { amount: 0, label: rule.label || '' };
  }

  let amount = 0;
  if (rule.type === 'percent') {
    amount = subtotal * (rule.value / 100);
    if (typeof rule.max === 'number') amount = Math.min(amount, rule.max);
  } else if (rule.type === 'fixed') {
    amount = rule.value;
  }
  amount = Math.max(0, Math.min(amount, subtotal));
  return { amount: Number(amount.toFixed(2)), label: rule.label || '' };
}

function getCartTotal() {
  const subtotal = getCartSubtotal();
  const d = computeDiscount(subtotal);
  return Math.max(0, subtotal - d.amount);
}

function syncDiscountInputs() {
  const code = appliedDiscount?.code || '';
  const a = document.getElementById('discountCodeInput');
  const b = document.getElementById('checkoutDiscountCode');
  if (a && a.value.trim() === '' && code) a.value = code;
  if (b && b.value.trim() === '' && code) b.value = code;
}

function setDiscountMessage(id, msg, ok=false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg || '';
  el.classList.toggle('ok', !!ok);
  el.classList.toggle('err', !ok && !!msg);
}

function applyDiscount(codeRaw, messageTarget) {
  const code = String(codeRaw || '').toUpperCase().trim();
  if (!code) {
    clearDiscount();
    setDiscountMessage(messageTarget, 'Discount cleared', true);
    return;
  }
  const rule = DISCOUNT_CODES[code];
  if (!rule) {
    setDiscountMessage(messageTarget, 'Invalid discount code', false);
    return;
  }
  if (rule.once && isDiscountUsed(code)) {
    setDiscountMessage(messageTarget, 'This code was already used on this account', false);
    return;
  }
  appliedDiscount = { code, amount: 0, label: rule.label || '' };
  saveDiscount();
  syncDiscountInputs();
  renderCart();
  renderCheckoutSummary();
  setDiscountMessage(messageTarget, `Applied: ${code} (${rule.label || 'discount'})`, true);
}

function applyDiscountFromUI() {
  const input = document.getElementById('discountCodeInput');
  applyDiscount(input ? input.value : '', 'discountMessage');
}
function applyDiscountFromCheckout() {
  const input = document.getElementById('checkoutDiscountCode');
  applyDiscount(input ? input.value : '', 'checkoutDiscountMessage');
}
// ----------------------------------------------------------------


function findProductById(id) {
    return products.find(p => p.id === id);
}

function addToCart(productId) {
    const product = findProductById(productId);
    if (!product) return;
    if (product.available === false) {
        showNotification(t('This item is unavailable.', 'هذا المنتج غير متوفر حالياً.'));
        return;
    }

    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: productId, qty: 1, product });
    }
    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    const badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = String(getCartQty());
}

function openCart() {
    renderCart();
    const m = document.getElementById('cartModal');
    if (m) m.style.display = 'block';
}

function closeCart() {
    const m = document.getElementById('cartModal');
    if (m) m.style.display = 'none';
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('totalPrice');

    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add products to start your order.</p>
        </div>`;
        totalEl.textContent = '0';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img class="cart-item-img" src="${item.product.image}" alt="${item.product.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.product.name}</div>
                <div class="cart-item-meta">$${item.product.price.toFixed(2)} each</div>
                <div class="qty-row">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
                    <span class="qty-val">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-subtotal">$${(item.product.price * item.qty).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    const subtotal = getCartSubtotal();
    const d = computeDiscount(subtotal);
    const subEl = document.getElementById('subtotalPrice');
    const discEl = document.getElementById('discountValue');
    const discLine = document.getElementById('cartDiscountLine');

    if (subEl) subEl.textContent = subtotal.toFixed(2);
    if (discEl) discEl.textContent = d.amount.toFixed(2);
    if (discLine) discLine.style.display = d.amount > 0 ? 'flex' : 'none';

    totalEl.textContent = (subtotal - d.amount).toFixed(2);
}

// Checkout modal
function openCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    const auth = (typeof getAuth === 'function') ? getAuth() : { loggedIn: false };
    if (!auth || !auth.loggedIn) {
        showNotification('Please sign in to checkout.');
        try { showLoginModal(); } catch(e){}
        return;
    }
    closeCart();
    renderCheckoutSummary();

    try { initNavToggle(); } catch(e) {}
    try { initSplashScreen(); } catch(e) {}
    const m = document.getElementById('checkoutModal');
    if (m) m.style.display = 'block';
}

function closeCheckout() {
    const m = document.getElementById('checkoutModal');
    if (m) m.style.display = 'none';
}

function switchCheckoutTab(tab) {
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(b => b.classList.remove('active'));
    const panels = document.querySelectorAll('.checkout-tab-panel');
    panels.forEach(p => p.classList.remove('active'));

    if (tab === 'whatsapp') {
        document.querySelector('.tab-btn.active')?.classList.remove('active');
        document.querySelectorAll('.tab-btn')[0]?.classList.add('active');
        document.getElementById('checkoutTabWhatsapp')?.classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1]?.classList.add('active');
        document.getElementById('checkoutTabForm')?.classList.add('active');
    }
}

function buildOrderText() {
    const lines = [];
    lines.push('Prime Store Order');
    lines.push('-------------------');
    cart.forEach(i => {
        lines.push(`${i.qty}x ${i.product.name} - $${(i.product.price * i.qty).toFixed(2)}`);
    });
    lines.push('-------------------');
    const subtotal = getCartSubtotal();
    const d = computeDiscount(subtotal);
    if (appliedDiscount && appliedDiscount.code && d.amount > 0) {
        lines.push(`Subtotal: $${subtotal.toFixed(2)}`);
        lines.push(`Discount (${appliedDiscount.code}): -$${d.amount.toFixed(2)}`);
    }
    lines.push(`Total: $${(subtotal - d.amount).toFixed(2)}`);
    lines.push('');
    lines.push('Customer details:');
    lines.push('- Name:');
    lines.push('- Contact (mobile number or Discord):');
    lines.push('- Email:');
    return lines.join('\n');
}

function renderCheckoutSummary() {
    const list = document.getElementById('checkoutSummary');
    const total = document.getElementById('checkoutTotal');
    if (!list || !total) return;

    list.innerHTML = cart.map(i => `
        <div class="summary-item">
            <span>${i.qty}× ${i.product.name}</span>
            <strong>$${(i.product.price * i.qty).toFixed(2)}</strong>
        </div>
    `).join('');

    const subtotal = getCartSubtotal();
    const d = computeDiscount(subtotal);

    const subEl = document.getElementById('checkoutSubtotal');
    const discEl = document.getElementById('checkoutDiscount');
    const discLine = document.getElementById('checkoutDiscountLine');

    if (subEl) subEl.textContent = subtotal.toFixed(2);
    if (discEl) discEl.textContent = d.amount.toFixed(2);
    if (discLine) discLine.style.display = d.amount > 0 ? 'flex' : 'none';

    total.textContent = (subtotal - d.amount).toFixed(2);
    syncDiscountInputs();

    const wa = document.getElementById('whatsappCheckoutBtn');
    if (wa) {
        const text = encodeURIComponent(buildOrderText());
        // No fixed number provided; this opens WhatsApp with a prefilled message.
        wa.href = `https://wa.me/?text=${text}`;
    }
}

async function copyOrderText() {
    try {
        await navigator.clipboard.writeText(buildOrderText());
        showNotification('Order text copied');
    } catch {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = buildOrderText();
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showNotification('Order text copied');
    }
}

function submitCheckoutForm(event) {
    event.preventDefault();
    if (cart.length === 0) return false;

    const name = document.getElementById('fullName')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const phone = document.getElementById('phone')?.value?.trim() || '';
    const notes = document.getElementById('notes')?.value?.trim() || '';

    const payload = {
        name, email, phone, notes,
        items: cart.map(i => ({ id: i.id, name: i.product.name, qty: i.qty, price: i.product.price })),
        total: getCartTotal(),
        createdAt: new Date().toISOString()
    };

    localStorage.setItem('prime_last_order_v1', JSON.stringify(payload));

    // Nice success UI
    const panel = document.getElementById('checkoutTabForm');
    if (panel) {
        panel.innerHTML = `
            <div class="success-box">
                <h3>Order received ✅</h3>
                <p>We saved your order on this device. You can now send it via WhatsApp for faster processing.</p>
                <div class="success-actions">
                    <a class="primary-btn" href="https://wa.me/?text=${encodeURIComponent(buildOrderText() + '\n\nName: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email + (notes ? '\nNotes: ' + notes : ''))}" target="_blank">
                        Send via WhatsApp
                    </a>
                    <button class="secondary-btn" type="button" onclick="copyOrderText()">Copy order text</button>
                </div>
            </div>
        `;
    }

    // clear cart
    cart = [];
    saveCart();
    updateCartCount();
    return false;
}

// -------------------------
// Auth (Front-end session)
// -------------------------

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function togglePassword() {
    const input = document.getElementById('password');
    const btn = document.querySelector('.toggle-pass');
    if (!input || !btn) return;
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    btn.textContent = showing ? 'Show' : 'Hide';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username')?.value?.trim();
    const password = document.getElementById('password')?.value || '';
    if (!username || password.length < 4) {
        showNotification('Please enter a valid username and password (min 4 chars)');
        return false;
    }

    const remember = document.getElementById('rememberMe')?.checked;
    const data = { username, loggedIn: true, at: Date.now() };
    if (remember) localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    else sessionStorage.setItem(AUTH_KEY, JSON.stringify(data));

    applyAuthUI();
    syncDiscountInputs();
    renderCart();
    renderCheckoutSummary();
    closeLoginModal();
    showNotification(`Welcome, ${username}!`);
    return false;
}

function getAuth() {
    try {
        const raw = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    applyAuthUI();
    syncDiscountInputs();
    renderCart();
    renderCheckoutSummary();
    showNotification('Signed out');
}


function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applyAuthUI() {
  const auth = (typeof getAuth === 'function') ? getAuth() : { loggedIn: false };

  // Preferred slot: <li id="authSlot"></li> inside the main nav
  let slot = document.getElementById('authSlot') || document.getElementById('accountNavItem');

  // If missing, try to create it inside .nav-menu
  if (!slot) {
    const nav = document.querySelector('.nav-menu');
    if (nav) {
      const li = document.createElement('li');
      li.id = 'authSlot';
      nav.appendChild(li);
      slot = li;
    }
  }

  if (!slot) return;

  if (!auth?.loggedIn) {
    slot.innerHTML = `<a href="#" onclick="showLoginModal(); return false;">Sign in</a>`;
    return;
  }

  const profile = (typeof getProfile === 'function') ? (getProfile() || {}) : {};
  const name = profile.name || auth.name || auth.email || 'Account';
  const letter = (name || 'A').trim()[0]?.toUpperCase() || 'A';

  slot.innerHTML = `
    <div class="account-menu">
      <button class="account-trigger" type="button" id="accountMenuBtn" aria-haspopup="true" aria-expanded="false">
        <span class="account-avatar"><span class="account-letter">${letter}</span></span>
        <span class="account-name">${escapeHtml(name)}</span>
        <span class="account-caret">▾</span>
      </button>
      <div class="account-dropdown" id="accountDropdown" role="menu" aria-label="Account">
        <a href="account.html" class="account-link" role="menuitem">My Account</a>
        <a href="admin.html" class="account-link" role="menuitem">Admin</a>
        <div class="account-sep"></div>
        <button class="account-link" type="button" id="logoutBtn">Sign out</button>
      </div>
    </div>
  `;

  const btn = document.getElementById('accountMenuBtn');
  const dd = document.getElementById('accountDropdown');

  const close = () => {
    dd?.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
  };

  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dd?.classList.toggle('open');
    btn?.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    try { clearAuth(); } catch(e){}
    try { setProfile(null); } catch(e){}
    applyAuthUI();
    try { syncDiscountInputs(); } catch(e){}
    try { renderCart(); } catch(e){}
    try { renderCheckoutSummary(); } catch(e){}
    showNotification('Signed out.');
  });
}

// -------------------------
// UI Helpers
// -------------------------

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'toast';
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(() => notification.classList.add('show'));
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 250);
    }, 1800);
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${product.available === false ? `<div class="product-badge">${t("UNAVAILABLE","غير متوفر")}</div>` : ""}
                <div class="product-description">${getProductDesc(product)}</div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" ${product.available === false ? "disabled" : ""} onclick="${product.available === false ? "" : `addToCart(${product.id})`}">${product.available === false ? t("Unavailable","غير متوفر") : t("Add to Cart","أضف للسلة")}</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    if (window.__prime_boot) return;
    window.__prime_boot = true;

    // Hydrate product reference in cart
    cart = cart.map(i => ({ ...i, product: findProductById(i.id) || i.product })).filter(i => i.product);

    try { initNavAndSplash(); } catch(e) {}

    renderProducts();
    updateCartCount();
    applyAuthUI();
    syncDiscountInputs();
    renderCart();
    renderCheckoutSummary();

    document.querySelector('.cart-icon')?.addEventListener('click', openCart);

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        ['cartModal', 'checkoutModal', 'loginModal'].forEach(id => {
            const m = document.getElementById(id);
            if (m && event.target === m) m.style.display = 'none';
        });
    });
});



/* =========================================================
   PRO Upgrade: 
/* =========================
   Auth (No OTP) + Account
   ========================= */

const USERS_KEY = "prime_users_v1";
const PROFILE_KEY = "prime_profile_v1";
const ACCESS_CODE = "PRIME2026"; // change if you want

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); } catch { return {}; }
}
function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users || {}));
}
function simpleHash(str) {
  // lightweight hash for demo-level protection (not cryptographic)
  let h = 2166136261;
  for (let i = 0; i < (str || "").length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}
function getAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : { loggedIn: false };
  } catch {
    return { loggedIn: false };
  }
}
function setAuth(auth, remember = true) {
  const payload = JSON.stringify(auth || { loggedIn: false });
  if (remember) {
    localStorage.setItem(AUTH_KEY, payload);
    sessionStorage.removeItem(AUTH_KEY);
  } else {
    sessionStorage.setItem(AUTH_KEY, payload);
    localStorage.removeItem(AUTH_KEY);
  }
}
function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
}
function getProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null"); } catch { return null; }
}
function setProfile(p) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p || null));
}

function showLoginModal() {
  const m = document.getElementById("loginModal");
  if (!m) return;
  m.style.display = "flex";
  m.setAttribute("aria-hidden", "false");
  switchAuthTab("signin");
  setTimeout(() => document.getElementById("loginEmail")?.focus(), 10);
}
function closeLoginModal() {
  const m = document.getElementById("loginModal");
  if (!m) return;
  m.style.display = "none";
  m.setAttribute("aria-hidden", "true");
}

function switchAuthTab(mode) {
  const tabS = document.getElementById("tabSignIn");
  const tabR = document.getElementById("tabRegister");
  const fS = document.getElementById("signInForm");
  const fR = document.getElementById("registerForm");
  if (!tabS || !tabR || !fS || !fR) return;

  if (mode === "register") {
    tabR.classList.add("active"); tabS.classList.remove("active");
    fR.style.display = "block"; fS.style.display = "none";
    document.getElementById("authTitle").textContent = "Create account";
    document.getElementById("authSubtitle").textContent = "Create an account to save your cart and manage orders.";
  } else {
    tabS.classList.add("active"); tabR.classList.remove("active");
    fS.style.display = "block"; fR.style.display = "none";
    document.getElementById("authTitle").textContent = "Welcome back";
    document.getElementById("authSubtitle").textContent = "Sign in to manage your cart and account.";
  }
}

function applyAuthUI() {
  const auth = getAuth();
  let accountItem = document.getElementById('authSlot') || document.getElementById('accountNavItem');
  if (!accountItem) {
    const nav = document.querySelector('.nav-menu') || document.getElementById('navMenu');
    if (nav) {
      const li = document.createElement('li');
      li.id = 'authSlot';
      nav.appendChild(li);
      accountItem = li;
    }
  }
  if (!accountItem) return;

  if (!auth?.loggedIn) {
    accountItem.innerHTML = `<button class="account-trigger" type="button" onclick="showLoginModal()">Sign in</button>`;
    return;
  }
  const profile = getProfile() || {};
  const name = profile.name || auth.name || auth.email || "Account";
  const avatar = profile.avatarDataUrl || "";
  const letter = (name || "A").trim()[0]?.toUpperCase() || "A";

  accountItem.innerHTML = `
    <div class="account-menu">
      <button class="account-trigger" type="button" id="accountMenuBtn">
        <span class="account-avatar">${avatar ? `<img src="${avatar}" alt="" />` : `<span class="account-letter">${letter}</span>`}</span>
        <span class="account-name">${escapeHtml(name)}</span>
        <span class="account-caret">▾</span>
      </button>
      <div class="account-dropdown" id="accountDropdown">
        <a href="account.html" class="account-link">My Account</a>
        <button class="account-link" type="button" id="logoutBtn">Sign out</button>
      </div>
    </div>
  `;

  const btn = document.getElementById("accountMenuBtn");
  const dd = document.getElementById("accountDropdown");
  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    dd?.classList.toggle("open");
  });
  document.addEventListener("click", () => dd?.classList.remove("open"));

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    clearAuth();
    setProfile(null);
    applyAuthUI();
    syncDiscountInputs();
    renderCart();
    renderCheckoutSummary();
    showNotification("Signed out.");
  });
}

document.getElementById("signInForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = (document.getElementById("loginEmail")?.value || "").trim().toLowerCase();
  const password = document.getElementById("loginPassword")?.value || "";
  if (!email || !password) return showNotification("Please enter email and password.");

  const users = getUsers();
  const u = users[email];
  if (!u) return showNotification("Account not found. Create an account first.");
  if (u.passwordHash !== simpleHash(password)) return showNotification("Incorrect password.");

  setAuth({ loggedIn: true, email, name: u.name }, true);
  setProfile({ email, name: u.name, avatarDataUrl: u.avatarDataUrl || "" });
  closeLoginModal();
  applyAuthUI();
  showNotification("Signed in.");
});

document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = (document.getElementById("registerName")?.value || "").trim();
  const email = (document.getElementById("registerEmail")?.value || "").trim().toLowerCase();
  const pass1 = document.getElementById("registerPassword")?.value || "";
  const pass2 = document.getElementById("registerPassword2")?.value || "";
  const code = (document.getElementById("registerCode")?.value || "").trim();

  if (code !== ACCESS_CODE) return showNotification("Invalid access code.");
  if (!name || name.length < 2) return showNotification("Please enter a valid name.");
  if (!email) return showNotification("Please enter a valid email.");
  if (pass1.length < 6) return showNotification("Password must be at least 6 characters.");
  if (pass1 !== pass2) return showNotification("Passwords do not match.");

  const users = getUsers();
  if (users[email]) return showNotification("This email is already registered.");

  users[email] = { name, email, passwordHash: simpleHash(pass1), createdAt: Date.now() };
  setUsers(users);

  setAuth({ loggedIn: true, email, name }, true);
  setProfile({ email, name });
  closeLoginModal();
  applyAuthUI();
  showNotification("Account created.");
});

/* =========================
   Orders (Netlify Forms) + Social Checkout
   ========================= */

const STORE_CONTACTS = {
  whatsappNumber: "00962799233736",
  instagram: "tazer.jor",
  discordInvite: "https://discord.gg/eNcPz4Jw2m",
  storeEmail: "okashahprimestore@gmail.com"
};

function buildOrderId() {
  return "PS-" + Math.random().toString(36).slice(2, 8).toUpperCase() + "-" + Date.now().toString().slice(-5);
}

async function submitOrderToNetlify(order) {
  try {
    const body = new URLSearchParams({
      "form-name": "orders",
      order_id: order.orderId,
      customer_email: order.email || "",
      customer_name: order.name || "",
      customer_contact_type: order.contactType || "",
      customer_contact: order.contactValue || "",
      items: JSON.stringify(order.items || []),
      total: String(order.total || ""),
      notes: order.notes || "",
      channel: order.channel || ""
    });
    await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  } catch {
    // If offline / blocked, it's okay; social message is still sent.
  }
}

function openSocialChannel(channel, message) {
  const text = encodeURIComponent(message);
  if (channel === "whatsapp") {
    const number = STORE_CONTACTS.whatsappNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener");
    return;
  }
  if (channel === "instagram") {
    // Instagram web doesn't support prefilled message reliably; open profile.
    window.open(`https://instagram.com/${STORE_CONTACTS.instagram}`, "_blank", "noopener");
    return;
  }
  if (channel === "discord") {
    window.open(STORE_CONTACTS.discordInvite, "_blank", "noopener");
    return;
  }
}

function buildOrderMessage(order) {
  const lines = [];
  lines.push(`Order: ${order.orderId}`);
  if (order.name) lines.push(`Name: ${order.name}`);
  if (order.email) lines.push(`Email: ${order.email}`);
  if (order.contactValue) lines.push(`Contact (${order.contactType || 'phone'}): ${order.contactValue}`);
  if (order.subtotal) lines.push(`Subtotal: $${order.subtotal}`);
  if (order.discountCode && Number(order.discountAmount) > 0) lines.push(`Discount (${order.discountCode}): -$${order.discountAmount}`);
  lines.push(`Total: $${order.total}`);
  lines.push("");
  lines.push("Items:");
  (order.items || []).forEach((it) => {
    lines.push(`- ${it.name} x${it.quantity} ($${it.price})`);
  });
  if (order.notes) {
    lines.push("");
    lines.push("Notes:");
    lines.push(order.notes);
  }
  return lines.join("\n");
}

/* Hook into your existing checkout button if present */


function getSelectedPayMethod() {
  const el = document.querySelector('input[name="payMethod"]:checked');
  return el ? el.value : "whatsapp";
}

function openPayConfirm() {
  const method = getSelectedPayMethod();
  const label = method === "whatsapp" ? "WhatsApp" : method === "instagram" ? "Instagram" : "Discord";
  const modal = document.getElementById("payConfirmModal");
  const text = document.getElementById("payConfirmText");
  if (text) text.textContent = `You selected ${label}. We will create your order and then take you to ${label}.`;
  if (modal) {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
  } else {
    // fallback: direct
    checkoutVia(method);
  }
}

function closePayConfirm() {
  const modal = document.getElementById("payConfirmModal");
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

function confirmPayMethod() {
  const method = getSelectedPayMethod();
  closePayConfirm();
  checkoutVia(method);
}

function checkoutVia(channel) {
  const notes = document.getElementById("checkoutNotes")?.value || "";
  finalizeOrder(channel, notes);
  try { closeCheckout(); } catch {}
}

window.finalizeOrder = async function(channel, notes="") {
  const auth = (typeof getAuth === 'function') ? getAuth() : { loggedIn: false };
  if (!auth || !auth.loggedIn) {
    showNotification('Please sign in to checkout.');
    try { showLoginModal(); } catch(e) {}
    return;
  }

  const profile = (typeof getProfile === 'function') ? (getProfile() || {}) : {};
  const name = profile.name || auth.name || '';
  const email = auth.email || profile.email || '';
  if (!email || !String(email).includes('@')) {
    showNotification('Please set your email in your account profile.');
    return;
  }

  const contactType = document.querySelector('input[name="contactType"]:checked')?.value || 'phone';
  const contactValue = document.getElementById('contactValue')?.value?.trim() || '';
  if (!contactValue) {
    showNotification('Please add your mobile number or Discord username.');
    return;
  }

  const items = (cart || []).map(i => ({
    id: i.id,
    name: i.product?.name || i.name || '',
    price: Number(i.product?.price ?? i.price ?? 0),
    quantity: Number(i.qty ?? i.quantity ?? 1)
  })).filter(it => it.name);

  if (!items.length) {
    showNotification('Your cart is empty.');
    return;
  }

  const subtotal = items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
  const d = computeDiscount(subtotal);
  const total = Math.max(0, subtotal - d.amount);

  const order = {
    orderId: buildOrderId(),
    name,
    email,
    contactType,
    contactValue,
    items,
    subtotal: subtotal.toFixed(2),
    discountCode: (appliedDiscount && appliedDiscount.code && d.amount > 0) ? appliedDiscount.code : '',
    discountAmount: d.amount.toFixed(2),
    total: total.toFixed(2),
    notes,
    channel
  };

  await submitOrderToNetlify(order);

  // Mark one-time codes as used after submitting
  if (order.discountCode && DISCOUNT_CODES[order.discountCode]?.once) {
    markDiscountUsed(order.discountCode);
  }

  // Email invoice (Pending)
  try {
    const res = await fetch('/.netlify/functions/send-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'send-invoice failed');
  } catch (e) {
    console.warn('Invoice email failed', e);
  }

  const msg = buildOrderMessage(order);
  openSocialChannel(channel, msg);

  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
  showNotification('Order created. Check your email for the pending invoice.');
};


function initApp(){
  // English-only
  currentLang = 'en';
  document.documentElement.setAttribute('lang','en');
  document.documentElement.setAttribute('dir','ltr');

  try { initNavAndSplash(); } catch(e) {}

  try { applyAuthUI(); } catch(e) {}
  try { renderProducts(); } catch(e) {}
  try { renderCart(); } catch(e) {}
  try { renderCheckoutSummary(); } catch(e) {}
  try { updateCartCount(); } catch(e) {}
}

/* Init (legacy fallback) */
document.addEventListener("DOMContentLoaded", () => {
  if (window.__prime_boot) return;
  window.__prime_boot = true;
  initApp();
});


// -------------------------
// Nav + Splash helpers
// -------------------------
function initNavAndSplash() {
  // Mobile nav
  const toggle = document.getElementById('navToggle') || document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu') || document.querySelector('.nav-menu');
  if (toggle && menu && !toggle.dataset.bound) {
    toggle.dataset.bound = '1';
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Splash (index only)
  const splash = document.getElementById('splashScreen');
  if (splash && !splash.dataset.bound) {
    splash.dataset.bound = '1';
    const hide = () => {
      splash.classList.add('hide');
      splash.setAttribute('aria-hidden','true');
      setTimeout(() => splash.remove(), 650);
    };
    splash.addEventListener('click', hide);
    setTimeout(hide, 1600);
  }
}
