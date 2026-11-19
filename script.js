
/* LUXE E-Commerce — script.js
   Full frontend-only store with localStorage
*/

'use strict';

/* 1. PRODUCT DATA */
const PRODUCTS = [
 {
  id: 1,
  title: "Chronograph Elite Watch",
  category: "Watches",
  price: 349.99,
  rating: 4.8,
  reviews: 214,
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  description: "Swiss-inspired precision with a sapphire crystal lens and premium stainless steel band. Water-resistant to 100m, featuring a chronograph sub-dial and date display."
 },
 {
  id: 2,
  title: "Midnight Leather Tote",
  category: "Bags",
  price: 189.00,
  rating: 4.6,
  reviews: 98,
  image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  description: "Full-grain vegetable-tanned leather with brass hardware. Spacious interior with suede lining, three interior pockets, and a removable zip pouch."
 },
 {
  id: 3,
  title: "Minimalist White Sneakers",
  category: "Shoes",
  price: 129.99,
  rating: 4.7,
  reviews: 341,
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  description: "Clean canvas uppers with vulcanized rubber soles. Ortholite insole for all-day comfort. Ethically made, sustainably sourced materials."
 },
 {
  id: 4,
  title: "Silk Scarf — Desert Sand",
  category: "Accessories",
  price: 74.00,
  rating: 4.5,
  reviews: 67,
  image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
  description: "100% pure mulberry silk, hand-rolled edges, and digitally printed with an exclusive abstract desert motif. 90x90cm. Made in Italy."
 },
 {
  id: 5,
  title: "Wireless Noise-Cancelling Headphones",
  category: "Tech",
  price: 299.00,
  rating: 4.9,
  reviews: 512,
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  description: "40-hour battery life with adaptive ANC. Premium leather ear cushions, foldable design, and studio-grade sound performance. USB-C fast charge."
 },
 {
  id: 6,
  title: "Ceramic Pour-Over Coffee Set",
  category: "Home",
  price: 88.50,
  rating: 4.7,
  reviews: 143,
  image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  description: "Hand-thrown matte ceramic dripper, carafe, and two mugs. Dishwasher safe, designed to brew 1–4 cups. Each piece is uniquely finished."
 },
 {
  id: 7,
  title: "Classic Oxford Brogues",
  category: "Shoes",
  price: 219.00,
  rating: 4.6,
  reviews: 88,
  image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=600&q=80",
  description: "Calfskin leather uppers with Goodyear-welted construction. Leather lining, rubber heel, and classic brogue detailing. Available in Tan and Espresso."
 },
 {
  id: 8,
  title: "Titanium Sunglasses",
  category: "Accessories",
  price: 265.00,
  rating: 4.8,
  reviews: 59,
  image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
  description: "Featherlight titanium frame with polarised CR-39 lenses. 100% UV400 protection. Spring hinges, scratch-resistant coating. Comes with a hard case."
 },
 {
  id: 9,
  title: "Smart Fitness Tracker",
  category: "Tech",
  price: 159.95,
  rating: 4.4,
  reviews: 267,
  image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
  description: "7-day battery, AMOLED display, blood oxygen and heart rate monitoring. Sleep tracking, 50+ workout modes, IP68 waterproof. Compatible with iOS & Android."
 },
 {
  id: 10,
  title: "Linen Throw Blanket",
  category: "Home",
  price: 69.00,
  rating: 4.5,
  reviews: 204,
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  description: "Pre-washed 100% Belgian linen, ultra-breathable and naturally temperature-regulating. 130x170cm, with a herringbone fringe finish. Oeko-Tex certified."
 },
 {
  id: 11,
  title: "Heritage Canvas Backpack",
  category: "Bags",
  price: 148.00,
  rating: 4.7,
  reviews: 176,
  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  description: "Waxed canvas body with leather trim and solid brass buckles. 20L capacity, laptop sleeve fits up to 16\", roll-top closure. Built to last a lifetime."
 },
 {
  id: 12,
  title: "Rose Gold Cuff Bracelet",
  category: "Accessories",
  price: 95.00,
  rating: 4.6,
  reviews: 41,
  image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  description: "18k rose gold plated sterling silver with a brushed finish. Adjustable cuff sizing, hypoallergenic. Beautifully gift-boxed."
 }
];


/* 2. STATE */
let cart = JSON.parse(localStorage.getItem('luxe_cart')) || [];
let orders = JSON.parse(localStorage.getItem('luxe_orders')) || [];
let filtered = [...PRODUCTS];


/* 3. INIT */
document.addEventListener('DOMContentLoaded', () => {

 renderProducts(PRODUCTS);
 updateCartBadge();

 // Cart trigger
 document.getElementById('cartTrigger').addEventListener('click', openCart);

 // Navbar scroll effect
 window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle(
   'scrolled',
   window.scrollY > 10
  );
 });

 // Payment radio styling
 document.querySelectorAll('.payment-option input').forEach(radio => {
  radio.addEventListener('change', () => {
   document.querySelectorAll('.payment-option').forEach(opt =>
    opt.classList.remove('active')
   );

   radio.closest('.payment-option').classList.add('active');
  });
 });

});


/* 4. PAGE NAVIGATION */
function showPage(page) {

 document.querySelectorAll('.page').forEach(p =>
  p.classList.remove('active')
 );

 document.getElementById(
  page === 'home' ? 'homePage' : 'ordersPage'
 ).classList.add('active');

 window.scrollTo({ top: 0, behavior: 'smooth' });

 if (page === 'orders') renderOrders();
}


/* 5. PRODUCT RENDERING */
function renderProducts(products) {

 const grid = document.getElementById('productGrid');
 const empty = document.getElementById('emptyState');
 const count = document.getElementById('resultsCount');

 count.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;

 if (products.length === 0) {
  grid.innerHTML = '';
  empty.style.display = 'block';
  return;
 }

 empty.style.display = 'none';

 grid.innerHTML = products.map((p, i) => `
  <div class="product-card" style="animation-delay:${i * 0.05}s">
   <div class="card-img-wrap" onclick="openModal(${p.id})">
    <img src="${p.image}" alt="${p.title}" loading="lazy" />
    <span class="card-category">${p.category}</span>
    <div class="card-quick-view">Quick View</div>
   </div>

   <div class="card-body">
    <div class="card-title">${p.title}</div>
    <div class="card-rating">
     <span class="stars">${renderStars(p.rating)}</span>
     <span>${p.rating} (${p.reviews})</span>
    </div>
    <div class="card-price">$${p.price.toFixed(2)}</div>
   </div>

   <div class="card-footer">
    <button class="btn-add-cart" id="addBtn_${p.id}"
     onclick="addToCart(${p.id}, this)">
     Add to Cart
    </button>
   </div>
  </div>
 `).join('');

}


function renderStars(rating) {

 const full = Math.floor(rating);
 const half = rating % 1 >= 0.5;

 let s = '★'.repeat(full);

 if (half) s += '½';

 return s;
}


/* 6. SEARCH & FILTER */
function filterProducts() {

 const query = document.getElementById('searchInput').value.toLowerCase();
 const category = document.getElementById('categoryFilter').value;
 const sort = document.getElementById('sortFilter').value;

 filtered = PRODUCTS.filter(p => {

  const matchSearch =
   p.title.toLowerCase().includes(query) ||
   p.category.toLowerCase().includes(query);

  const matchCategory = !category || p.category === category;

  return matchSearch && matchCategory;

 });

 if (sort === 'low') {
  filtered.sort((a, b) => a.price - b.price);
 }

 if (sort === 'high') {
  filtered.sort((a, b) => b.price - a.price);
 }

 if (sort === 'rating') {
  filtered.sort((a, b) => b.rating - a.rating);
 }

 renderProducts(filtered);
}


function clearFilters() {

 document.getElementById('searchInput').value = '';
 document.getElementById('categoryFilter').value = '';
 document.getElementById('sortFilter').value = '';

 filterProducts();
}


/* 7. PRODUCT MODAL */
function openModal(id) {

 const p = PRODUCTS.find(x => x.id === id);

 if (!p) return;

 document.getElementById('modalContent').innerHTML = `
  <div class="modal-img-wrap">
   <img src="${p.image}" alt="${p.title}" />
  </div>

  <div class="modal-info">
   <div class="modal-category">${p.category}</div>
   <div class="modal-title">${p.title}</div>

   <div class="modal-rating">
    <span class="stars">${renderStars(p.rating)}</span>
    <span>${p.rating} · ${p.reviews} reviews</span>
   </div>

   <div class="modal-price">$${p.price.toFixed(2)}</div>
   <div class="modal-desc">${p.description}</div>

   <button class="modal-add-btn" id="modalAddBtn"
    onclick="addToCart(${p.id}, this)">
    Add to Cart
   </button>
  </div>
 `;

 document.getElementById('modalOverlay').classList.add('active');
 document.getElementById('productModal').classList.add('active');

 document.body.style.overflow = 'hidden';
}


function closeModal() {

 document.getElementById('modalOverlay').classList.remove('active');
 document.getElementById('productModal').classList.remove('active');

 document.body.style.overflow = '';
}


/* 8. CART — ADD */
function addToCart(id, btn) {

 const product = PRODUCTS.find(p => p.id === id);

 if (!product) return;

 const existing = cart.find(item => item.id === id);

 if (existing) {
  existing.qty++;
 } else {
  cart.push({ ...product, qty: 1 });
 }

 saveCart();
 updateCartBadge();
 renderCartItems();
 animateAddBtn(btn);

 showToast(`"${product.title}" added to cart`);
}


function animateAddBtn(btn) {

 if (!btn) return;

 const original = btn.textContent;

 btn.textContent = '✓ Added!';
 btn.classList.add('added');

 setTimeout(() => {
  btn.textContent = original;
  btn.classList.remove('added');
 }, 1600);
}


/* 9. CART — PANEL */
function openCart() {

 document.getElementById('cartPanel').classList.add('open');
 document.getElementById('cartOverlay').classList.add('active');

 document.body.style.overflow = 'hidden';

 renderCartItems();
}


function closeCart() {

 document.getElementById('cartPanel').classList.remove('open');
 document.getElementById('cartOverlay').classList.remove('active');

 document.body.style.overflow = '';
}


function renderCartItems() {

 const cartItems = document.getElementById('cartItems');
 const cartEmpty = document.getElementById('cartEmpty');
 const cartFooter = document.getElementById('cartFooter');
 const itemCount = document.getElementById('cartItemCount');

 const total = cart.reduce((s, i) => s + i.qty, 0);

 itemCount.textContent = total > 0
  ? `(${total} item${total > 1 ? 's' : ''})`
  : '';

 if (cart.length === 0) {

  cartEmpty.style.display = 'flex';
  cartItems.innerHTML = '';
  cartFooter.style.display = 'none';

  return;
 }

 cartEmpty.style.display = 'none';
 cartFooter.style.display = 'block';

 cartItems.innerHTML = cart.map(item => `
  <div class="cart-item" id="cartItem_${item.id}">

   <img class="cart-item-img" src="${item.image}" alt="${item.title}" />

   <div class="cart-item-info">
    <div class="cart-item-name">${item.title}</div>

    <div class="cart-item-price">
     $${item.price.toFixed(2)} each
    </div>

    <div class="cart-item-controls">

     <button class="qty-btn"
      onclick="changeQty(${item.id}, -1)">−</button>

     <span class="qty-display">${item.qty}</span>

     <button class="qty-btn"
      onclick="changeQty(${item.id}, 1)">+</button>

     <button class="remove-btn"
      onclick="removeFromCart(${item.id})">Remove</button>

    </div>
   </div>
  </div>
 `).join('');

 updateTotals();
}


function changeQty(id, delta) {

 const item = cart.find(i => i.id === id);

 if (!item) return;

 item.qty = Math.max(1, item.qty + delta);

 saveCart();
 updateCartBadge();
 renderCartItems();
}


function removeFromCart(id) {

 cart = cart.filter(i => i.id !== id);

 saveCart();
 updateCartBadge();
 renderCartItems();

 showToast('Item removed from cart');
}


function updateTotals() {

 const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

 const tax = subtotal * 0.08;
 const total = subtotal + tax;

 document.getElementById('subtotal').textContent =
  `$${subtotal.toFixed(2)}`;

 document.getElementById('taxAmount').textContent =
  `$${tax.toFixed(2)}`;

 document.getElementById('totalAmount').textContent =
  `$${total.toFixed(2)}`;
}


function updateCartBadge() {

 const count = cart.reduce((s, i) => s + i.qty, 0);

 const badge = document.getElementById('cartBadge');

 badge.textContent = count;
 badge.classList.add('bump');

 setTimeout(() => badge.classList.remove('bump'), 300);
}


function saveCart() {
 localStorage.setItem('luxe_cart', JSON.stringify(cart));
}


/* 10. CHECKOUT */
function openCheckout() {

 closeCart();

 // Populate summary
 const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

 const tax = subtotal * 0.08;
 const total = subtotal + tax;

 document.getElementById('checkoutSummary').innerHTML = `
  <div class="s-row">
   <span>Items (${cart.reduce((s,i)=>s+i.qty,0)})</span>
   <span>$${subtotal.toFixed(2)}</span>
  </div>

  <div class="s-row">
   <span>Tax (8%)</span>
   <span>$${tax.toFixed(2)}</span>
  </div>

  <div class="s-row bold">
   <span>Order Total</span>
   <span>$${total.toFixed(2)}</span>
  </div>
 `;

 // Reset
 document.getElementById('checkoutForm').style.display = 'block';
 document.getElementById('orderSuccess').style.display = 'none';

 document.getElementById('checkoutOverlay').classList.add('active');
 document.getElementById('checkoutModal').classList.add('active');

 document.body.style.overflow = 'hidden';
}


function closeCheckout() {

 document.getElementById('checkoutOverlay').classList.remove('active');
 document.getElementById('checkoutModal').classList.remove('active');

 document.body.style.overflow = '';
}


function placeOrder() {

 // Simple validation
 const fields = [
  { id: 'chkName', label: 'Full Name' },
  { id: 'chkEmail', label: 'Email' },
  { id: 'chkAddress', label: 'Address' },
  { id: 'chkCity', label: 'City' },
  { id: 'chkZip', label: 'ZIP Code' }
 ];

 for (const f of fields) {

  const el = document.getElementById(f.id);

  if (!el.value.trim()) {

   el.focus();
   el.style.borderColor = 'var(--red)';

   showToast(`Please enter your ${f.label}`);

   el.addEventListener('input', () => {
    el.style.borderColor = '';
   }, { once: true });

   return;
  }
 }

 const payment =
  document.querySelector('input[name="payment"]:checked').value;

 const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

 const tax = subtotal * 0.08;

 // Build order object
 const order = {

  id: 'ORD-' + Date.now(),

  date: new Date().toLocaleDateString('en-US', {
   year: 'numeric',
   month: 'long',
   day: 'numeric',
   hour: '2-digit',
   minute: '2-digit'
  }),

  items: [...cart],

  subtotal: subtotal.toFixed(2),
  tax: tax.toFixed(2),
  total: (subtotal + tax).toFixed(2),

  name: document.getElementById('chkName').value,
  email: document.getElementById('chkEmail').value,

  address: `${document.getElementById('chkAddress').value}, ${document.getElementById('chkCity').value} ${document.getElementById('chkZip').value}`,

  payment,
  status: 'Confirmed'
 };

 // Persist
 orders.unshift(order);

 localStorage.setItem('luxe_orders', JSON.stringify(orders));

 // Clear cart
 cart = [];

 saveCart();
 updateCartBadge();

 // Show success
 document.getElementById('orderIdLabel').textContent =
  `Order ID: ${order.id}`;

 document.getElementById('checkoutForm').style.display = 'none';
 document.getElementById('orderSuccess').style.display = 'block';

 // Clear form
 ['chkName', 'chkEmail', 'chkAddress', 'chkCity', 'chkZip'].forEach(id => {
  document.getElementById(id).value = '';
 });
}


/* 11. ORDERS PAGE */
function renderOrders() {

 const container = document.getElementById('ordersContainer');

 orders = JSON.parse(localStorage.getItem('luxe_orders')) || [];

 if (orders.length === 0) {

  container.innerHTML = `
   <div class="no-orders">
    <div class="empty-icon">📦</div>
    <p>You haven't placed any orders yet.</p>

    <button class="btn-secondary" onclick="showPage('home')">
     Start Shopping
    </button>
   </div>
  `;

  return;
 }

 container.innerHTML = orders.map(order => `
  <div class="order-card">

   <div class="order-card-header">

    <div>
     <div class="order-id">${order.id}</div>

     <div class="order-date">
      ${order.date} · ${order.payment.toUpperCase()} · ${order.address}
     </div>
    </div>

    <span class="order-status">${order.status}</span>

    <div class="order-total-label">$${order.total}</div>

   </div>

   <div class="order-items">

    ${order.items.map(item => `
     <div class="order-item">

      <img src="${item.image}" alt="${item.title}" />

      <div>
       <div class="order-item-name">${item.title}</div>
       <div class="order-item-qty">Qty: ${item.qty}</div>
      </div>

      <div class="order-item-price">
       $${(item.price * item.qty).toFixed(2)}
      </div>

     </div>
    `).join('')}

   </div>
  </div>
 `).join('');
}


/* 12. MOBILE MENU */
function closeMobileMenu() {

 document.getElementById('navLinks').classList.remove('open');

 document.getElementById('hamburgerBtn').classList.remove('open');
}


document.getElementById('hamburgerBtn').addEventListener('click', () => {

 document.getElementById('navLinks').classList.toggle('open');

 document.getElementById('hamburgerBtn').classList.toggle('open');

});


/* 13. TOAST */
let toastTimer;

function showToast(msg) {

 const toast = document.getElementById('toast');

 toast.textContent = msg;
 toast.classList.add('show');

 clearTimeout(toastTimer);

 toastTimer = setTimeout(() => {
  toast.classList.remove('show');
 }, 2800);
}
