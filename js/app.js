/**
 * RON - Global Application Logic, Motion Triggers, and Glassmorphic Cart UI
 */

import { cart, CURRENCIES, sounds, showToast } from './store.js';
import { AmbientSchematics } from './ambient-schematics.js';
import { initMotion, initMagneticElements } from './motion.js';

export function initGlobalUI() {
  new AmbientSchematics('ron-ambient-canvas');
  initMotion();
  initNavbarScroll();
  initCurrencySelector();
  initCartDrawer();
  initNewsletter();
  initLiveFooterClock();
}

function initNavbarScroll() {
  const navWrapper = document.querySelector('.ron-nav-wrapper');
  if (!navWrapper) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navWrapper.classList.add('scrolled');
    } else {
      navWrapper.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initCurrencySelector() {
  const selects = document.querySelectorAll('.ron-currency-select');
  selects.forEach(select => {
    select.value = cart.currency;
    select.addEventListener('change', (e) => {
      sounds.click('soft');
      cart.setCurrency(e.target.value);
      selects.forEach(s => s.value = e.target.value);
      updatePagePrices();
    });
  });
}

export function updatePagePrices() {
  document.querySelectorAll('[data-usd]').forEach(el => {
    const usd = parseFloat(el.getAttribute('data-usd'));
    if (!isNaN(usd)) {
      el.textContent = cart.formatPrice(usd);
    }
  });
}

function initCartDrawer() {
  const cartBtn = document.getElementById('ron-cart-toggle');
  const cartOverlay = document.getElementById('ron-cart-overlay');
  const cartClose = document.getElementById('ron-cart-close');
  const cartBadge = document.getElementById('ron-cart-badge');
  const cartItemsContainer = document.getElementById('ron-cart-items-list');
  const cartSubtotal = document.getElementById('ron-cart-subtotal');
  const cartDiscount = document.getElementById('ron-cart-discount');
  const cartDiscountRow = document.getElementById('ron-cart-discount-row');
  const cartShipping = document.getElementById('ron-cart-shipping');
  const cartTotal = document.getElementById('ron-cart-total');
  const freeShippingBar = document.getElementById('ron-free-shipping-bar');
  const freeShippingMsg = document.getElementById('ron-free-shipping-msg');
  const promoInput = document.getElementById('ron-promo-input');
  const promoApplyBtn = document.getElementById('ron-promo-apply');

  function openCart() {
    sounds.click('soft');
    if (cartOverlay) cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    sounds.click('soft');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  cart.subscribe((state) => {
    if (cartBadge) {
      cartBadge.textContent = state.count;
      cartBadge.style.display = state.count > 0 ? 'inline-block' : 'none';
    }

    if (cartItemsContainer) {
      if (state.items.length === 0) {
        cartItemsContainer.innerHTML = `
          <div class="flex flex-col items-center justify-center py-16 text-center">
            <div class="w-16 h-16 rounded-full bg-[#5336CC]/10 border border-[#8B77A4]/20 flex items-center justify-center mb-5 text-2xl text-[#5336CC]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <p class="font-heading font-semibold text-[#252425] text-base mb-1">Your bag is empty</p>
            <p class="text-xs text-[#6C6A6E] max-w-[220px] mb-6">Engineered phone cases await your bespoke customization.</p>
            <a href="shop.html" class="ron-btn ron-btn-primary ron-btn-sm">Explore Collection</a>
          </div>
        `;
      } else {
        cartItemsContainer.innerHTML = state.items.map(item => `
          <div class="ron-cart-item flex gap-4 pb-5 border-b border-[#8B77A4]/15">
            <div class="w-20 h-24 rounded-xl bg-[#F6F5F9] border border-[#8B77A4]/20 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="${item.studioImg || 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=300&q=80'}" alt="${item.name}" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start">
                  <h4 class="font-heading font-semibold text-sm text-[#252425]">${item.name}</h4>
                  <button class="ron-cart-remove-item text-[#8B77A4] hover:text-[#5336CC] text-xs font-mono transition" data-key="${item.uniqueKey}">&times;</button>
                </div>
                <p class="text-xs text-[#6C6A6E] mt-0.5">${item.device || 'iPhone 16 Pro Max'}</p>
                <div class="flex flex-wrap gap-1.5 mt-2">
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5336CC]/10 border border-[#5336CC]/20 text-[#5336CC]">${item.finish}</span>
                  ${item.colorName ? `<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 border border-black/10 text-[#252425]">${item.colorName}</span>` : ''}
                  ${item.monogramText ? `<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5336CC]/10 border border-[#5336CC]/30 text-[#5336CC]">Engraved: "${item.monogramText}"</span>` : ''}
                </div>
              </div>
              <div class="flex justify-between items-center mt-3">
                <div class="flex items-center border border-[#8B77A4]/30 rounded-lg overflow-hidden bg-white">
                  <button class="ron-qty-minus px-2.5 py-1 text-xs text-[#252425] hover:bg-[#5336CC]/10" data-key="${item.uniqueKey}">-</button>
                  <span class="px-2 text-xs font-mono text-[#252425] font-semibold">${item.qty}</span>
                  <button class="ron-qty-plus px-2.5 py-1 text-xs text-[#252425] hover:bg-[#5336CC]/10" data-key="${item.uniqueKey}">+</button>
                </div>
                <div class="font-mono text-sm font-bold text-[#5336CC]">
                  ${cart.formatPrice(item.priceUSD * item.qty)}
                </div>
              </div>
            </div>
          </div>
        `).join('');

        cartItemsContainer.querySelectorAll('.ron-cart-remove-item').forEach(btn => {
          btn.addEventListener('click', () => cart.removeItem(btn.getAttribute('data-key')));
        });
        cartItemsContainer.querySelectorAll('.ron-qty-minus').forEach(btn => {
          btn.addEventListener('click', () => cart.updateQty(btn.getAttribute('data-key'), -1));
        });
        cartItemsContainer.querySelectorAll('.ron-qty-plus').forEach(btn => {
          btn.addEventListener('click', () => cart.updateQty(btn.getAttribute('data-key'), 1));
        });
      }
    }

    if (cartSubtotal) cartSubtotal.textContent = cart.formatPrice(state.subtotalUSD);
    if (cartShipping) {
      cartShipping.textContent = state.shippingUSD === 0 ? 'Complimentary' : cart.formatPrice(state.shippingUSD);
    }
    if (cartTotal) cartTotal.textContent = cart.formatPrice(state.finalTotalUSD);

    if (cartDiscountRow) {
      if (state.discountUSD > 0) {
        cartDiscountRow.style.display = 'flex';
        if (cartDiscount) cartDiscount.textContent = `-${cart.formatPrice(state.discountUSD)} (${state.discountPercent}%)`;
      } else {
        cartDiscountRow.style.display = 'none';
      }
    }

    if (freeShippingBar) freeShippingBar.style.width = `${state.freeShippingProgress}%`;
    if (freeShippingMsg) {
      if (state.subtotalUSD >= state.freeShippingThresholdUSD) {
        freeShippingMsg.innerHTML = '<span class="text-[#5336CC] font-bold">✓ Unlocked Complimentary Express Courier</span>';
      } else {
        const remaining = state.freeShippingThresholdUSD - state.subtotalUSD;
        freeShippingMsg.innerHTML = `Add <strong class="text-[#5336CC]">${cart.formatPrice(remaining)}</strong> for Complimentary Express Courier`;
      }
    }

    updatePagePrices();
    initMagneticElements();
  });

  if (promoApplyBtn && promoInput) {
    promoApplyBtn.addEventListener('click', () => {
      const res = cart.applyPromo(promoInput.value);
      if (res.success) {
        showToast(res.message, 'success');
        promoInput.value = '';
      } else {
        showToast(res.message, 'crimson');
      }
    });
  }

  cart.notify();
}

function initNewsletter() {
  const form = document.getElementById('ron-newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sounds.click('metallic');
    showToast('Subscribed to Ron Atelier Releases & Limited Drops.', 'success');
    form.reset();
  });
}

function initLiveFooterClock() {
  const clockEl = document.getElementById('ron-live-clock');
  if (!clockEl) return;

  const updateClock = () => {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSs = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `LAB TIME: ${utcHours}:${utcMins}:${utcSs} UTC &middot; TOKYO / SF / LONDON`;
  };

  setInterval(updateClock, 1000);
  updateClock();
}
