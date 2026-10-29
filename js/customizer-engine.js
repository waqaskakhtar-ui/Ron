/**
 * RON Interactive Phone Case Customizer Engine
 * High-precision canvas & SVG hybrid renderer with 3D tilt, lighting toggles,
 * custom photo drop-zone, and 360-degree rotational angle view.
 */

import { sounds } from './store.js';

export class RonCustomizerEngine {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.options = Object.assign({
      device: 'iPhone 16 Pro Max',
      finish: 'matte',
      color: '#5336CC',
      colorName: 'Electric Ultraviolet',
      monogramText: 'RON',
      monogramFont: 'Space Grotesk',
      monogramFoil: 'gold',
      monogramPosition: 'bottom-center',
      magsafeStyle: 'machined',
      cameraRing: 'titanium',
      lightingMode: 'studio', // 'studio', 'ultraviolet', 'sunset'
      rotationAngle: 0, // 0 to 360 deg
      uploadedImageURL: null,
      onPriceChange: null
    }, options);

    this.tilt = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.render();
    this.attachTilt();
    this.calculatePrice();
  }

  update(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.render();
    this.calculatePrice();
  }

  calculatePrice() {
    let base = 68;
    if (this.options.finish === 'carbon') base += 16;
    if (this.options.finish === 'leather') base += 24;
    if (this.options.finish === 'clear') base += 6;

    if (this.options.monogramText && this.options.monogramText.trim().length > 0) {
      base += 10;
    }
    if (this.options.uploadedImageURL) {
      base += 12; // Custom UV laser printed artwork surcharge
    }
    if (this.options.cameraRing === 'crimson' || this.options.cameraRing === 'gold') {
      base += 8;
    }

    if (typeof this.options.onPriceChange === 'function') {
      this.options.onPriceChange(base);
    }
    return base;
  }

  render() {
    if (!this.container) return;

    const {
      device,
      finish,
      color,
      monogramText,
      monogramFont,
      monogramFoil,
      monogramPosition,
      magsafeStyle,
      cameraRing,
      lightingMode,
      rotationAngle,
      uploadedImageURL
    } = this.options;

    // Device geometries
    const isSamsung = device.includes('Galaxy');
    const isPixel = device.includes('Pixel');
    const isSmallIphone = device === 'iPhone 16 Pro';

    const width = 360;
    const height = isSamsung ? 730 : isSmallIphone ? 680 : 710;
    const cornerRadius = isSamsung ? 14 : isPixel ? 42 : 46;

    const cleanText = (monogramText || '').slice(0, 8).toUpperCase();

    // Foil styling
    let foilFill = '#C0C0C8';
    let foilFilter = 'url(#deboss-filter)';
    let foilStyle = '';

    if (monogramFoil === 'deboss') {
      foilFill = 'rgba(0,0,0,0.55)';
      foilFilter = 'url(#deboss-filter)';
    } else if (monogramFoil === 'silver') {
      foilFill = 'url(#silver-foil-grad)';
      foilFilter = 'url(#foil-specular)';
    } else if (monogramFoil === 'gold') {
      foilFill = 'url(#gold-foil-grad)';
      foilFilter = 'url(#gold-specular)';
    } else if (monogramFoil === 'ultraviolet') {
      foilFill = '#5336CC';
      foilFilter = 'url(#uv-glow)';
      foilStyle = 'text-shadow: 0 0 12px rgba(83,54,204,0.85);';
    }

    // Camera Ring Accent Color
    let ringColor = '#8B77A4';
    if (cameraRing === 'midnight') ringColor = '#252425';
    if (cameraRing === 'titanium') ringColor = '#D4D4D8';
    if (cameraRing === 'crimson') ringColor = '#FF2A3B';
    if (cameraRing === 'ultraviolet') ringColor = '#5336CC';
    if (cameraRing === 'gold') ringColor = '#EAB308';

    // Monogram coordinates
    let monoX = width / 2;
    let monoY = height - 85;
    let textAnchor = 'middle';
    let transform = '';

    if (monogramPosition === 'bottom-right') {
      monoX = width - 50;
      monoY = height - 85;
      textAnchor = 'end';
    } else if (monogramPosition === 'vertical-spine') {
      monoX = width - 36;
      monoY = height / 2;
      textAnchor = 'middle';
      transform = `rotate(90, ${monoX}, ${monoY})`;
    }

    // 360 Rotation Transform Simulation
    const rad = (rotationAngle * Math.PI) / 180;
    const scaleX = Math.cos(rad);
    const perspectiveSkew = Math.sin(rad) * 15;

    const svg = `
      <svg id="ron-case-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-2xl select-none transition-all duration-300" style="transform: scaleX(${scaleX}) skewY(${perspectiveSkew * 0.1}deg);">
        <defs>
          <!-- 3D Shadow -->
          <filter id="case-depth-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#5336CC" flood-opacity="0.22" />
            <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#252425" flood-opacity="0.18" />
          </filter>

          <!-- Lighting Modes -->
          ${lightingMode === 'ultraviolet' ? `
            <linearGradient id="lighting-specular" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#5336CC" stop-opacity="0.35" />
              <stop offset="40%" stop-color="#8B77A4" stop-opacity="0.1" />
              <stop offset="100%" stop-color="#252425" stop-opacity="0.4" />
            </linearGradient>
          ` : lightingMode === 'sunset' ? `
            <linearGradient id="lighting-specular" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF9F43" stop-opacity="0.28" />
              <stop offset="45%" stop-color="#FFFFFF" stop-opacity="0.15" />
              <stop offset="100%" stop-color="#252425" stop-opacity="0.3" />
            </linearGradient>
          ` : `
            <linearGradient id="lighting-specular" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25" />
              <stop offset="35%" stop-color="#FFFFFF" stop-opacity="0.08" />
              <stop offset="100%" stop-color="#252425" stop-opacity="0.25" />
            </linearGradient>
          `}

          <!-- Carbon Fiber 3K Weave Pattern -->
          <pattern id="carbon-weave" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#1C1B1E" />
            <rect x="0" y="0" width="6" height="6" fill="#28262E" />
            <rect x="6" y="6" width="6" height="6" fill="#28262E" />
            <line x1="0" y1="0" x2="6" y2="6" stroke="#3F3C47" stroke-width="0.8" />
            <line x1="6" y1="6" x2="12" y2="12" stroke="#3F3C47" stroke-width="0.8" />
            <line x1="6" y1="0" x2="0" y2="6" stroke="#141316" stroke-width="0.8" />
            <line x1="12" y1="6" x2="6" y2="12" stroke="#141316" stroke-width="0.8" />
          </pattern>

          <!-- Leather Micro Grain Pattern -->
          <pattern id="leather-grain" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="${color}" />
            <circle cx="4" cy="4" r="1.4" fill="#000000" fill-opacity="0.18" />
            <circle cx="12" cy="12" r="1.4" fill="#000000" fill-opacity="0.18" />
            <circle cx="12" cy="4" r="1.1" fill="#ffffff" fill-opacity="0.12" />
            <circle cx="4" cy="12" r="1.1" fill="#ffffff" fill-opacity="0.12" />
            <circle cx="8" cy="8" r="1.2" fill="#000000" fill-opacity="0.15" />
          </pattern>

          <!-- Silver Foil Gradient -->
          <linearGradient id="silver-foil-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="25%" stop-color="#C8C8D0" />
            <stop offset="50%" stop-color="#FFFFFF" />
            <stop offset="75%" stop-color="#9C9CA4" />
            <stop offset="100%" stop-color="#E5E5EB" />
          </linearGradient>

          <!-- Gold Foil Gradient -->
          <linearGradient id="gold-foil-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF2B2" />
            <stop offset="30%" stop-color="#E5B242" />
            <stop offset="60%" stop-color="#FFE082" />
            <stop offset="85%" stop-color="#B3861B" />
            <stop offset="100%" stop-color="#FCD34D" />
          </linearGradient>

          <filter id="foil-specular">
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" flood-color="#ffffff" flood-opacity="0.5" />
            <feDropShadow dx="0" dy="-0.5" stdDeviation="0.5" flood-color="#000000" flood-opacity="0.6" />
          </filter>

          <filter id="deboss-filter">
            <feDropShadow dx="0" dy="1" stdDeviation="0.7" flood-color="#ffffff" flood-opacity="0.25" />
            <feDropShadow dx="0" dy="-1" stdDeviation="0.8" flood-color="#000000" flood-opacity="0.8" />
          </filter>

          <filter id="uv-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#5336CC" flood-opacity="0.9" />
          </filter>
        </defs>

        <!-- Main Outer Case Chassis -->
        <g filter="url(#case-depth-shadow)">
          <!-- Base Armor Shell -->
          <rect
            x="4"
            y="4"
            width="${width - 8}"
            height="${height - 8}"
            rx="${cornerRadius}"
            ry="${cornerRadius}"
            fill="${finish === 'carbon' ? 'url(#carbon-weave)' : finish === 'leather' ? 'url(#leather-grain)' : color}"
            stroke="rgba(139,119,164,0.3)"
            stroke-width="1.8"
          />

          <!-- Uploaded Artwork / Photo Overlay -->
          ${uploadedImageURL ? `
            <clipPath id="case-clip">
              <rect x="4" y="4" width="${width - 8}" height="${height - 8}" rx="${cornerRadius}" ry="${cornerRadius}" />
            </clipPath>
            <image
              href="${uploadedImageURL}"
              x="4"
              y="4"
              width="${width - 8}"
              height="${height - 8}"
              preserveAspectRatio="xMidYMid slice"
              clip-path="url(#case-clip)"
              opacity="0.85"
            />
          ` : ''}

          <!-- Translucent Frosted Glass Layer for Clear Finish -->
          ${finish === 'clear' ? `
            <rect
              x="6"
              y="6"
              width="${width - 12}"
              height="${height - 12}"
              rx="${cornerRadius - 2}"
              ry="${cornerRadius - 2}"
              fill="rgba(254, 254, 255, 0.45)"
            />
            <rect
              x="20"
              y="20"
              width="${width - 40}"
              height="${height - 40}"
              rx="${cornerRadius - 10}"
              fill="none"
              stroke="rgba(83, 54, 204, 0.25)"
              stroke-width="1.2"
              stroke-dasharray="8 6"
            />
          ` : ''}

          <!-- Perimeter Stitching for Italian Leather -->
          ${finish === 'leather' ? `
            <rect
              x="12"
              y="12"
              width="${width - 24}"
              height="${height - 24}"
              rx="${cornerRadius - 6}"
              ry="${cornerRadius - 6}"
              fill="none"
              stroke="#D2B48C"
              stroke-opacity="0.5"
              stroke-width="1.2"
              stroke-dasharray="4 3"
            />
          ` : ''}

          <!-- Lighting Specular Overlay -->
          <rect
            x="4"
            y="4"
            width="${width - 8}"
            height="${height - 8}"
            rx="${cornerRadius}"
            ry="${cornerRadius}"
            fill="url(#lighting-specular)"
            pointer-events="none"
          />
        </g>

        <!-- MagSafe Magnetic Array -->
        ${magsafeStyle !== 'none' ? `
          <g opacity="${magsafeStyle === 'stealth' ? '0.15' : magsafeStyle === 'coils' ? '0.9' : '0.6'}" transform="translate(${width/2}, ${height/2 - 20})">
            <circle
              r="68"
              fill="none"
              stroke="${magsafeStyle === 'coils' ? '#E5A93C' : '#FEFEFF'}"
              stroke-width="${magsafeStyle === 'coils' ? '3.5' : '2.5'}"
              stroke-dasharray="${magsafeStyle === 'coils' ? '5 2' : 'none'}"
            />
            <circle
              r="62"
              fill="none"
              stroke="${magsafeStyle === 'coils' ? '#D97706' : '#8B77A4'}"
              stroke-width="1"
              opacity="0.7"
            />
            <line
              x1="0"
              y1="78"
              x2="0"
              y2="108"
              stroke="${magsafeStyle === 'coils' ? '#E5A93C' : '#FEFEFF'}"
              stroke-width="3"
              stroke-linecap="round"
            />
            ${magsafeStyle === 'glyph' ? `
              <text x="0" y="5" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="12" fill="#FEFEFF" letter-spacing="0.2em">RON</text>
            ` : ''}
          </g>
        ` : ''}

        <!-- Camera Housing by Device -->
        ${this.renderCameraHousing(device, ringColor)}

        <!-- Engineered Ron Signature Branding -->
        <g opacity="0.75">
          <text
            x="${width / 2}"
            y="${height - 35}"
            text-anchor="middle"
            font-family="'Space Grotesk', sans-serif"
            font-size="9"
            font-weight="700"
            letter-spacing="0.32em"
            fill="rgba(254,254,255,0.7)"
          >RON &middot; PRECISION LABS</text>
        </g>

        <!-- Custom User Monogram Engraving -->
        ${cleanText ? `
          <g transform="${transform}">
            <text
              x="${monoX}"
              y="${monoY}"
              text-anchor="${textAnchor}"
              font-family="${monogramFont}, sans-serif"
              font-size="22"
              font-weight="700"
              letter-spacing="0.18em"
              fill="${foilFill}"
              filter="${foilFilter}"
              style="${foilStyle}"
            >${cleanText}</text>
          </g>
        ` : ''}
      </svg>
    `;

    this.container.innerHTML = svg;
  }

  renderCameraHousing(device, ringColor) {
    if (device.includes('Galaxy')) {
      return `
        <g transform="translate(32, 44)">
          <circle cx="28" cy="28" r="23" fill="#1E1D1E" stroke="${ringColor}" stroke-width="2.5" />
          <circle cx="28" cy="28" r="14" fill="#0A0A0C" stroke="#3F3C47" stroke-width="1.5" />
          <circle cx="24" cy="24" r="5" fill="#FFFFFF" fill-opacity="0.3" />

          <circle cx="28" cy="86" r="23" fill="#1E1D1E" stroke="${ringColor}" stroke-width="2.5" />
          <circle cx="28" cy="86" r="14" fill="#0A0A0C" stroke="#3F3C47" stroke-width="1.5" />
          <circle cx="24" cy="82" r="5" fill="#FFFFFF" fill-opacity="0.3" />

          <circle cx="28" cy="144" r="23" fill="#1E1D1E" stroke="${ringColor}" stroke-width="2.5" />
          <circle cx="28" cy="144" r="14" fill="#0A0A0C" stroke="#3F3C47" stroke-width="1.5" />
          <circle cx="24" cy="140" r="5" fill="#FFFFFF" fill-opacity="0.3" />

          <circle cx="76" cy="38" r="11" fill="#1E1D1E" stroke="${ringColor}" stroke-width="1.5" />
          <circle cx="76" cy="74" r="8" fill="#FFFBEB" stroke="#D97706" stroke-width="1" />
          <circle cx="76" cy="110" r="11" fill="#1E1D1E" stroke="${ringColor}" stroke-width="1.5" />
        </g>
      `;
    } else if (device.includes('Pixel')) {
      return `
        <g transform="translate(12, 46)">
          <rect x="0" y="0" width="336" height="74" rx="37" ry="37" fill="#1E1D1E" stroke="${ringColor}" stroke-width="2.5" />
          <rect x="6" y="6" width="324" height="62" rx="31" ry="31" fill="#141316" />
          <rect x="24" y="14" width="168" height="46" rx="23" ry="23" fill="#050507" />
          <circle cx="56" cy="37" r="16" fill="#1C1B1E" stroke="#3F3C47" stroke-width="1.5" />
          <circle cx="53" cy="33" r="5" fill="#FFFFFF" fill-opacity="0.25" />
          <circle cx="106" cy="37" r="15" fill="#1C1B1E" stroke="#3F3C47" stroke-width="1.5" />
          <rect x="144" y="27" width="20" height="20" rx="4" fill="#1C1B1E" stroke="#3F3C47" stroke-width="1.2" />
          <circle cx="270" cy="37" r="9" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1" />
        </g>
      `;
    } else {
      return `
        <g transform="translate(24, 28)">
          <rect x="0" y="0" width="142" height="146" rx="32" ry="32" fill="rgba(37,36,37,0.4)" stroke="${ringColor}" stroke-width="2" />
          <g transform="translate(38, 38)">
            <circle r="26" fill="#1E1D1E" stroke="${ringColor}" stroke-width="2.5" />
            <circle r="18" fill="#0E0D10" stroke="#3F3C47" stroke-width="1.5" />
            <ellipse cx="-5" cy="-6" rx="6" ry="3" fill="#FFFFFF" fill-opacity="0.32" transform="rotate(-30)" />
          </g>
          <g transform="translate(38, 108)">
            <circle r="26" fill="#1E1D1E" stroke="${ringColor}" stroke-width="2.5" />
            <circle r="18" fill="#0E0D10" stroke="#3F3C47" stroke-width="1.5" />
            <ellipse cx="-5" cy="-6" rx="6" ry="3" fill="#FFFFFF" fill-opacity="0.32" transform="rotate(-30)" />
          </g>
          <g transform="translate(104, 73)">
            <circle r="26" fill="#1E1D1E" stroke="${ringColor}" stroke-width="2.5" />
            <circle r="18" fill="#0E0D10" stroke="#3F3C47" stroke-width="1.5" />
            <ellipse cx="-5" cy="-6" rx="6" ry="3" fill="#FFFFFF" fill-opacity="0.32" transform="rotate(-30)" />
          </g>
          <circle cx="104" cy="32" r="9" fill="#FFFBEB" stroke="#E5A93C" stroke-width="1.2" />
          <circle cx="104" cy="116" r="8" fill="#1E1D1E" stroke="#3F3C47" stroke-width="1" />
        </g>
      `;
    }
  }

  attachTilt() {
    const el = this.container;
    if (!el) return;

    el.onmousemove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotY = ((x - centerX) / centerX) * 10;
      const rotX = -((y - centerY) / centerY) * 10;

      el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    el.onmouseleave = () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    el.onmouseenter = () => {
      el.style.transition = 'transform 0.1s ease-out';
    };
  }

  exportSnapshot() {
    sounds.click('metallic');
    const svgEl = this.container.querySelector('svg');
    if (!svgEl) return null;

    const xml = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 720;
      canvas.height = 1420;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FEFEFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pngURL = canvas.toDataURL('image/png');
      const dlLink = document.createElement('a');
      dlLink.download = `ron-bespoke-case-${Date.now()}.png`;
      dlLink.href = pngURL;
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
      URL.revokeObjectURL(blobURL);
    };
    image.src = blobURL;
  }
}
