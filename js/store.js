/**
 * RON (Custom Phone Case Online Shop)
 * Core Store State & Catalog Data System
 * Brand Palette: #FEFEFF (Base), #252425 (Onyx), #5336CC (Ultraviolet), #8B77A4 (Lavender)
 */

export const BEST_SELLERS = [
  {
    id: 'ron-matte-black',
    name: 'Matte Black',
    series: 'Series 01 - Signature',
    subtitle: 'Tactile micro-matte nanocoating with zero fingerprint retention.',
    priceUSD: 38,
    category: 'stealth',
    finish: 'matte',
    featureTag: 'Slim Fit',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.98,
    reviewCount: 642,
    badge: 'Best Seller',
    svgImg: 'assets/case-matte-black.svg',
    studioImg: 'assets/case-matte-black.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80',
    colorHex: '#1E1D1F',
    colors: ['#1E1D1F', '#2C2B2E'],
    colorNames: ['Matte Black'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-stone-gray',
    name: 'Stone Gray',
    series: 'Series 01 - Signature',
    subtitle: 'Tactile mineral stone composite with muted architectural warmth.',
    priceUSD: 39,
    category: 'minimal',
    finish: 'matte',
    featureTag: 'Slim Fit',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.95,
    reviewCount: 388,
    badge: 'Popular',
    svgImg: 'assets/case-stone-gray.svg',
    studioImg: 'assets/case-stone-gray.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80',
    colorHex: '#7A7982',
    colors: ['#7A7982', '#63626A'],
    colorNames: ['Stone Gray'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-deep-blue',
    name: 'Deep Blue',
    series: 'Series 01 - Signature',
    subtitle: 'Oceanic deep navy with scratch-resistant nano-ceramic matrix.',
    priceUSD: 38,
    category: 'stealth',
    finish: 'matte',
    featureTag: 'Slim Fit',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.96,
    reviewCount: 412,
    badge: 'Best Seller',
    svgImg: 'assets/case-deep-blue.svg',
    studioImg: 'assets/case-deep-blue.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1569144157591-c60f3f82f137?auto=format&fit=crop&w=1000&q=80',
    colorHex: '#1C2A3D',
    colors: ['#1C2A3D', '#142030'],
    colorNames: ['Deep Blue'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-sand-beige',
    name: 'Sand Beige',
    series: 'Series 01 - Signature',
    subtitle: 'Calm desert dune sand tone with satin soft-touch texture.',
    priceUSD: 38,
    category: 'minimal',
    finish: 'matte',
    featureTag: 'Slim Fit',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.94,
    reviewCount: 295,
    badge: 'Staff Pick',
    svgImg: 'assets/case-sand-beige.svg',
    studioImg: 'assets/case-sand-beige.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80',
    colorHex: '#D8CFBC',
    colors: ['#D8CFBC', '#C4B9A4'],
    colorNames: ['Sand Beige'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-carbon-fiber',
    name: 'Carbon Fiber',
    series: 'Series 01 - Signature',
    subtitle: 'Genuine Toray 3K aerospace twill weave composite. 5x tensile strength.',
    priceUSD: 42,
    category: 'stealth',
    finish: 'carbon',
    featureTag: 'Ultra Armor',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.99,
    reviewCount: 820,
    badge: 'Pro Edition',
    svgImg: 'assets/case-carbon-fiber.svg',
    studioImg: 'assets/case-carbon-fiber.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80',
    colorHex: '#252425',
    colors: ['#252425', '#1B1A1C'],
    colorNames: ['Carbon Fiber'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  }
];

export const DESIGN_IDEAS = [
  {
    id: 'good-vibes-only',
    title: 'Good Vibes Only',
    tag: 'Typographic',
    priceUSD: 45,
    svgImg: 'assets/case-design-goodvibes.svg',
    description: 'High-contrast monochrome typographic statement.'
  },
  {
    id: 'topography-gold',
    title: 'Topography Gold',
    tag: 'Contour Lines',
    priceUSD: 48,
    svgImg: 'assets/case-design-topography.svg',
    description: '24K gold foil elevation curves at 3,840m altitude.'
  },
  {
    id: 'alpine-monochrome',
    title: 'Alpine Monochrome',
    tag: 'Landscape',
    priceUSD: 45,
    svgImg: 'assets/case-design-alpine.svg',
    description: 'High-contrast summit ridges with alpine snow caps.'
  },
  {
    id: 'white-marble',
    title: 'White Marble',
    tag: 'Stone Veins',
    priceUSD: 45,
    svgImg: 'assets/case-design-marble.svg',
    description: 'Italian Carrara marble with delicate grey and gold veining.'
  },
  {
    id: 'geometric-tree',
    title: 'Geometric Fir Tree',
    tag: 'Line Art',
    priceUSD: 45,
    svgImg: 'assets/case-design-tree.svg',
    description: 'Minimalist pine forest geometry with Pacific NW coordinates.'
  },
  {
    id: 'vibrant-geo-art',
    title: 'Vibrant Geo Art',
    tag: 'Modern Abstract',
    priceUSD: 48,
    svgImg: 'assets/case-design-geoart.svg',
    description: 'Bauhaus and stained glass geometric harmony.'
  }
];

export const DESIGN_IDEAS_CATALOG = [
  {
    id: 'ron-good-vibes',
    name: 'Good Vibes Only',
    series: 'Series 04 - On-Demand',
    subtitle: 'High-contrast monochrome typographic statement case.',
    priceUSD: 45,
    category: 'stealth',
    finish: 'matte',
    featureTag: 'Custom Art',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.97,
    reviewCount: 382,
    badge: 'Popular Print',
    svgImg: 'assets/case-design-goodvibes.svg',
    studioImg: 'assets/case-design-goodvibes.svg',
    lifestyleImg: 'assets/case-design-goodvibes.svg',
    colorHex: '#141316',
    colors: ['#141316', '#5336CC'],
    colorNames: ['Obsidian Print', 'Violet Accent'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-topography-gold',
    name: 'Topography Gold',
    series: 'Series 04 - On-Demand',
    subtitle: '24K gold foil elevation curves at 3,840m altitude.',
    priceUSD: 48,
    category: 'stealth',
    finish: 'matte',
    featureTag: 'Gold Foil',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.99,
    reviewCount: 520,
    badge: 'Limited Foil',
    svgImg: 'assets/case-design-topography.svg',
    studioImg: 'assets/case-design-topography.svg',
    lifestyleImg: 'assets/case-design-topography.svg',
    colorHex: '#201F22',
    colors: ['#201F22', '#D4AF37'],
    colorNames: ['Obsidian Matte', '24K Gold Leaf'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-alpine-mono',
    name: 'Alpine Monochrome',
    series: 'Series 04 - On-Demand',
    subtitle: 'High-contrast summit ridges with alpine snow caps.',
    priceUSD: 45,
    category: 'stealth',
    finish: 'matte',
    featureTag: 'Custom Art',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.96,
    reviewCount: 418,
    badge: 'Alpine Edition',
    svgImg: 'assets/case-design-alpine.svg',
    studioImg: 'assets/case-design-alpine.svg',
    lifestyleImg: 'assets/case-design-alpine.svg',
    colorHex: '#171619',
    colors: ['#171619', '#FEFEFF'],
    colorNames: ['Alpine Shadow', 'Summit Snow'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-white-marble',
    name: 'White Marble',
    series: 'Series 04 - On-Demand',
    subtitle: 'Italian Carrara marble with delicate grey and gold veining.',
    priceUSD: 45,
    category: 'minimal',
    finish: 'matte',
    featureTag: 'Stone Veins',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.95,
    reviewCount: 310,
    badge: 'Carrara Edition',
    svgImg: 'assets/case-design-marble.svg',
    studioImg: 'assets/case-design-marble.svg',
    lifestyleImg: 'assets/case-design-marble.svg',
    colorHex: '#F7F6FA',
    colors: ['#F7F6FA', '#CBB178'],
    colorNames: ['Carrara White', 'Gold Vein'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-geometric-tree',
    name: 'Geometric Fir Tree',
    series: 'Series 04 - On-Demand',
    subtitle: 'Minimalist pine forest geometry with Pacific NW coordinates.',
    priceUSD: 45,
    category: 'stealth',
    finish: 'matte',
    featureTag: 'Line Art',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.94,
    reviewCount: 265,
    badge: 'Pacific NW',
    svgImg: 'assets/case-design-tree.svg',
    studioImg: 'assets/case-design-tree.svg',
    lifestyleImg: 'assets/case-design-tree.svg',
    colorHex: '#18181B',
    colors: ['#18181B', '#5336CC'],
    colorNames: ['Basalt Matte', 'Ultraviolet Accent'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  },
  {
    id: 'ron-vibrant-geo',
    name: 'Vibrant Geo Art',
    series: 'Series 04 - On-Demand',
    subtitle: 'Bauhaus and stained glass geometric harmony.',
    priceUSD: 48,
    category: 'stealth',
    finish: 'matte',
    featureTag: 'Modern Abstract',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.98,
    reviewCount: 442,
    badge: 'Modernist',
    svgImg: 'assets/case-design-geoart.svg',
    studioImg: 'assets/case-design-geoart.svg',
    lifestyleImg: 'assets/case-design-geoart.svg',
    colorHex: '#1C182A',
    colors: ['#1C182A', '#5336CC', '#FBBC04'],
    colorNames: ['Bauhaus Shadow', 'Ultraviolet', 'Solar Yellow'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro']
  }
];

export const CATALOG = [
  ...BEST_SELLERS,
  ...DESIGN_IDEAS_CATALOG,
  {
    id: 'ron-stealth-01',
    name: 'Ron Stealth Ultra',
    series: 'Series 01 - Stealth',
    subtitle: 'Ultra-thin 0.8mm aerospace composite with tactile matte black nano-coating.',
    priceUSD: 78,
    category: 'stealth',
    finish: 'matte',
    featureTag: 'Slim Fit',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.96,
    reviewCount: 342,
    badge: 'Flagship Edition',
    svgImg: 'assets/case-matte-black.svg',
    studioImg: 'assets/case-matte-black.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80',
    colors: ['#252425', '#5336CC', '#8B77A4'],
    colorNames: ['Onyx Charcoal', 'Electric Ultraviolet', 'Lavender Slate'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro'],
    specs: {
      thickness: '0.8mm',
      weight: '24g',
      dropProtection: '12ft / 3.6m',
      magsafe: 'Strong 15N Magnetic Array',
      material: 'Aerospace Polycarbonate & Ceramic Nanocoat'
    }
  },
  {
    id: 'ron-carbon-twill',
    name: 'Ron Carbon Weave',
    series: 'Series 01 - Stealth',
    subtitle: 'Real 3K aerospace twill carbon fiber with vacuum-pressed resin matrix.',
    priceUSD: 94,
    category: 'stealth',
    finish: 'carbon',
    featureTag: 'Ultra Armor',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.98,
    reviewCount: 518,
    badge: 'Bestseller',
    svgImg: 'assets/case-carbon-fiber.svg',
    studioImg: 'assets/case-carbon-fiber.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80',
    colors: ['#252425', '#5336CC', '#1B1C22'],
    colorNames: ['Raw 3K Carbon', 'Ultraviolet Weave', 'Midnight Forged'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro'],
    specs: {
      thickness: '0.95mm',
      weight: '28g',
      dropProtection: '14ft / 4.2m',
      magsafe: '18N Neodymium Array',
      material: 'Genuine Toray 3K Carbon Fiber'
    }
  },
  {
    id: 'ron-minimal-02',
    name: 'Ron Minimal Atelier',
    series: 'Series 02 - Minimal',
    subtitle: 'Pure monolithic geometry with flush camera rim and zero excess volume.',
    priceUSD: 72,
    category: 'minimal',
    finish: 'matte',
    featureTag: 'Slim Fit',
    defaultDevice: 'iPhone 16 Pro',
    rating: 4.92,
    reviewCount: 284,
    badge: 'Architect Series',
    svgImg: 'assets/case-stone-gray.svg',
    studioImg: 'assets/case-stone-gray.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80',
    colors: ['#FEFEFF', '#8B77A4', '#5336CC'],
    colorNames: ['Crisp Off-White', 'Lavender Slate', 'Electric Violet'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro'],
    specs: {
      thickness: '0.75mm',
      weight: '21g',
      dropProtection: '10ft / 3.0m',
      magsafe: 'Direct-bond MagSafe 15N',
      material: 'Anodized Tactile Polymer'
    }
  },
  {
    id: 'ron-leather-nappa',
    name: 'Ron Nappa Florence',
    series: 'Series 02 - Minimal',
    subtitle: 'Full-grain Italian vegetable-tanned leather that develops a bespoke patina.',
    priceUSD: 108,
    category: 'minimal',
    finish: 'leather',
    featureTag: 'MagSafe',
    defaultDevice: 'iPhone 16 Pro Max',
    rating: 4.97,
    reviewCount: 412,
    badge: 'Limited Artisan',
    svgImg: 'assets/case-sand-beige.svg',
    studioImg: 'assets/case-sand-beige.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80',
    colors: ['#3A2F2B', '#252425', '#5336CC'],
    colorNames: ['Espresso Tuscan', 'Onyx Charcoal', 'Deep Violet Nappa'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro'],
    specs: {
      thickness: '1.2mm',
      weight: '34g',
      dropProtection: '12ft / 3.6m',
      magsafe: 'Ultra-thin N52 Magnet Ring',
      material: 'Tuscan Full-Grain Vegetable Leather'
    }
  },
  {
    id: 'ron-armor-03',
    name: 'Ron Armor Kinetic',
    series: 'Series 03 - Armor',
    subtitle: 'Dual-shot internal ribbing with corner air-cushions engineered for severe impact.',
    priceUSD: 88,
    category: 'armor',
    finish: 'matte',
    featureTag: 'Ultra Armor',
    defaultDevice: 'Galaxy S25 Ultra',
    rating: 4.95,
    reviewCount: 689,
    badge: 'Mil-Spec Drop 16ft',
    svgImg: 'assets/case-deep-blue.svg',
    studioImg: 'assets/case-deep-blue.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=1000&q=80',
    colors: ['#252425', '#5336CC', '#8B77A4'],
    colorNames: ['Tactical Onyx', 'Ultraviolet Edge', 'Lavender Shield'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro'],
    specs: {
      thickness: '1.4mm',
      weight: '39g',
      dropProtection: '16ft / 4.8m',
      magsafe: 'Reinforced 20N Array',
      material: 'Impact Thermoplastic & Kevlar Core'
    }
  },
  {
    id: 'ron-frosted-crystal',
    name: 'Ron Frost Crystal',
    series: 'Series 02 - Minimal',
    subtitle: 'Non-yellowing frosted micro-matte backplate highlighting your device chassis.',
    priceUSD: 74,
    category: 'minimal',
    finish: 'clear',
    featureTag: 'MagSafe',
    defaultDevice: 'Pixel 9 Pro',
    rating: 4.91,
    reviewCount: 310,
    badge: 'UV-Lock Clear',
    svgImg: 'assets/case-stone-gray.svg',
    studioImg: 'assets/case-stone-gray.svg',
    lifestyleImg: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1000&q=80',
    colors: ['#FEFEFF', '#8B77A4', '#5336CC'],
    colorNames: ['Pure Frosted', 'Lavender Tint', 'Ultraviolet MagSafe'],
    compatibleDevices: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'Galaxy S25 Ultra', 'Pixel 9 Pro'],
    specs: {
      thickness: '0.85mm',
      weight: '25g',
      dropProtection: '10ft / 3.0m',
      magsafe: 'Precision Laser Embedded Ring',
      material: 'Bayer UV-Stabilized Polycarbonate'
    }
  }
];

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  JPY: { symbol: '¥', rate: 152.0, label: 'JPY (¥)' }
};

// Web Audio Sound Engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  click(type = 'soft') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      if (type === 'soft') {
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'metallic') {
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.06);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'add') {
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.09);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch {
      // Audio not allowed or unavailable
    }
  }
}

export const sounds = new SoundEngine();

// Cart Store
class CartStore {
  constructor() {
    this.items = [];
    this.currency = 'USD';
    this.listeners = new Set();
    this.promoCode = '';
    this.discountPercent = 0;
    this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem('ron_cart');
      if (stored) {
        this.items = JSON.parse(stored);
      }
      const curr = localStorage.getItem('ron_currency');
      if (curr && CURRENCIES[curr]) {
        this.currency = curr;
      }
    } catch (e) {
      console.warn('Could not read cart', e);
    }
  }

  save() {
    try {
      localStorage.setItem('ron_cart', JSON.stringify(this.items));
      localStorage.setItem('ron_currency', this.currency);
    } catch (e) {
      console.warn('Could not save cart', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.getState()));
  }

  addItem(item) {
    sounds.click('add');
    const uniqueKey = [
      item.id,
      item.device,
      item.finish,
      item.colorName,
      item.monogramText || 'none',
      item.monogramFont || 'none',
      item.monogramFoil || 'none',
      item.magsafeStyle || 'standard',
      item.cameraRing || 'standard'
    ].join('__');

    const existingIndex = this.items.findIndex(i => i.uniqueKey === uniqueKey);
    if (existingIndex > -1) {
      this.items[existingIndex].qty += item.qty || 1;
    } else {
      this.items.push({
        ...item,
        uniqueKey,
        qty: item.qty || 1,
        addedAt: Date.now()
      });
    }
    this.save();
    return uniqueKey;
  }

  removeItem(uniqueKey) {
    sounds.click('soft');
    this.items = this.items.filter(i => i.uniqueKey !== uniqueKey);
    this.save();
  }

  updateQty(uniqueKey, delta) {
    sounds.click('soft');
    const item = this.items.find(i => i.uniqueKey === uniqueKey);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(uniqueKey);
    } else {
      this.save();
    }
  }

  clear() {
    this.items = [];
    this.promoCode = '';
    this.discountPercent = 0;
    this.save();
  }

  setCurrency(currCode) {
    if (CURRENCIES[currCode]) {
      this.currency = currCode;
      this.save();
    }
  }

  applyPromo(code) {
    const clean = code.trim().toUpperCase();
    if (clean === 'RON15' || clean === 'ULTRA') {
      this.promoCode = clean;
      this.discountPercent = 15;
      this.notify();
      return { success: true, message: '15% Atelier Privilege Applied' };
    } else if (clean === 'STEALTH') {
      this.promoCode = clean;
      this.discountPercent = 20;
      this.notify();
      return { success: true, message: '20% Founder Discount Applied' };
    }
    return { success: false, message: 'Invalid or expired code. Try "RON15"' };
  }

  removePromo() {
    this.promoCode = '';
    this.discountPercent = 0;
    this.notify();
  }

  formatPrice(amountUSD) {
    const info = CURRENCIES[this.currency] || CURRENCIES.USD;
    const converted = amountUSD * info.rate;
    if (this.currency === 'JPY') {
      return `${info.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${info.symbol}${converted.toFixed(2)}`;
  }

  getState() {
    const totalCount = this.items.reduce((acc, item) => acc + item.qty, 0);
    const subtotalUSD = this.items.reduce((acc, item) => acc + (item.priceUSD * item.qty), 0);
    const discountUSD = (subtotalUSD * this.discountPercent) / 100;
    const shippingUSD = subtotalUSD >= 120 || subtotalUSD === 0 ? 0 : 12;
    const finalTotalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);

    return {
      items: this.items,
      count: totalCount,
      subtotalUSD,
      discountUSD,
      discountPercent: this.discountPercent,
      promoCode: this.promoCode,
      shippingUSD,
      freeShippingThresholdUSD: 120,
      freeShippingProgress: Math.min(100, Math.round((subtotalUSD / 120) * 100)),
      finalTotalUSD,
      currency: this.currency,
      currencyInfo: CURRENCIES[this.currency]
    };
  }
}

export const cart = new CartStore();

// Global Toast System
export function showToast(message, type = 'info', actionText = null, actionCallback = null) {
  let container = document.getElementById('ron-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ron-toast-container';
    container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'ron-toast pointer-events-auto flex items-center justify-between gap-4 px-5 py-3.5 rounded-full bg-[#252425]/95 text-[#FEFEFF] backdrop-blur-xl border border-[#8B77A4]/30 shadow-2xl text-xs font-mono tracking-wide transform transition-all duration-300 translate-y-4 opacity-0';

  const left = document.createElement('div');
  left.className = 'flex items-center gap-2.5';
  
  const dot = document.createElement('span');
  dot.className = `w-2 h-2 rounded-full ${type === 'success' ? 'bg-[#5336CC]' : type === 'crimson' ? 'bg-[#FF2A3B]' : 'bg-[#8B77A4]'}`;
  
  const text = document.createElement('span');
  text.textContent = message;
  left.appendChild(dot);
  left.appendChild(text);
  toast.appendChild(left);

  if (actionText && actionCallback) {
    const btn = document.createElement('button');
    btn.className = 'ml-2 underline font-semibold text-[#FEFEFF] hover:text-[#5336CC] transition';
    btn.textContent = actionText;
    btn.onclick = () => {
      actionCallback();
      toast.remove();
    };
    toast.appendChild(btn);
  }

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}
