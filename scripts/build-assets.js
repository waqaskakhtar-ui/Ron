const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Reusable SVG phone case generator
function buildPhoneSVG({
  id,
  bodyColor = '#1E1D1F',
  bodyPattern = '',
  bodyFill = null,
  lensRingColor = '#2C2B2E',
  lensBg = '#0D0D0E',
  logoColor = 'rgba(255,255,255,0.45)',
  artworkContent = '',
  badge = ''
}) {
  const fill = bodyFill || bodyColor;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 640" width="320" height="640">
  <defs>
    <filter id="shadow-${id}" x="-20%" y="-15%" width="140%" height="135%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000000" flood-opacity="0.32" />
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.18" />
    </filter>

    <linearGradient id="rim-grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.32)" />
      <stop offset="30%" stop-color="rgba(255,255,255,0.06)" />
      <stop offset="70%" stop-color="rgba(0,0,0,0.15)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.18)" />
    </linearGradient>

    <linearGradient id="lens-shimmer" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#5336CC" stop-opacity="0.65" />
      <stop offset="40%" stop-color="#252425" stop-opacity="0.95" />
      <stop offset="80%" stop-color="#141416" />
      <stop offset="100%" stop-color="#8B77A4" stop-opacity="0.55" />
    </linearGradient>

    <clipPath id="case-clip-${id}">
      <rect x="20" y="20" width="280" height="600" rx="52" />
    </clipPath>

    ${bodyPattern}
  </defs>

  <!-- Phone Case Outer Body with Shadow -->
  <g filter="url(#shadow-${id})">
    <rect x="20" y="20" width="280" height="600" rx="52" fill="${fill}" />
    <!-- Chamfered Edge Reflection -->
    <rect x="20" y="20" width="280" height="600" rx="52" fill="none" stroke="url(#rim-grad-${id})" stroke-width="2.5" />
  </g>

  <!-- Injected Artwork / Graphic (clipped to phone body) -->
  <g clip-path="url(#case-clip-${id})">
    ${artworkContent}
  </g>

  <!-- Camera Plateau Island -->
  <g transform="translate(38, 38)">
    <!-- Island Drop Shadow -->
    <rect x="0" y="0" width="112" height="116" rx="30" fill="rgba(0,0,0,0.22)" transform="translate(0, 3)" />
    <!-- Island Plate -->
    <rect x="0" y="0" width="112" height="116" rx="30" fill="${fill}" />
    <rect x="0" y="0" width="112" height="116" rx="30" fill="rgba(0,0,0,0.15)" />
    <rect x="0" y="0" width="112" height="116" rx="30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />

    <!-- Lens 1 (Top Left) -->
    <g transform="translate(32, 32)">
      <circle cx="0" cy="0" r="24" fill="rgba(0,0,0,0.25)" transform="translate(0, 2)" />
      <circle cx="0" cy="0" r="23" fill="${lensRingColor}" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
      <circle cx="0" cy="0" r="18" fill="${lensBg}" />
      <circle cx="0" cy="0" r="16" fill="url(#lens-shimmer)" />
      <circle cx="-5" cy="-5" r="4" fill="rgba(255,255,255,0.5)" filter="blur(0.8px)" />
      <circle cx="4" cy="5" r="2.5" fill="rgba(83,54,204,0.7)" />
    </g>

    <!-- Lens 2 (Bottom Left) -->
    <g transform="translate(32, 84)">
      <circle cx="0" cy="0" r="24" fill="rgba(0,0,0,0.25)" transform="translate(0, 2)" />
      <circle cx="0" cy="0" r="23" fill="${lensRingColor}" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
      <circle cx="0" cy="0" r="18" fill="${lensBg}" />
      <circle cx="0" cy="0" r="16" fill="url(#lens-shimmer)" />
      <circle cx="-5" cy="-5" r="4" fill="rgba(255,255,255,0.5)" filter="blur(0.8px)" />
      <circle cx="4" cy="5" r="2.5" fill="rgba(83,54,204,0.7)" />
    </g>

    <!-- Lens 3 (Right Center) -->
    <g transform="translate(80, 58)">
      <circle cx="0" cy="0" r="24" fill="rgba(0,0,0,0.25)" transform="translate(0, 2)" />
      <circle cx="0" cy="0" r="23" fill="${lensRingColor}" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
      <circle cx="0" cy="0" r="18" fill="${lensBg}" />
      <circle cx="0" cy="0" r="16" fill="url(#lens-shimmer)" />
      <circle cx="-5" cy="-5" r="4" fill="rgba(255,255,255,0.5)" filter="blur(0.8px)" />
      <circle cx="4" cy="5" r="2.5" fill="rgba(83,54,204,0.7)" />
    </g>

    <!-- TrueTone Flash -->
    <circle cx="80" cy="24" r="8" fill="#FFF2CC" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
    <circle cx="80" cy="24" r="4" fill="#FFE082" />

    <!-- LiDAR Sensor -->
    <circle cx="80" cy="92" r="5" fill="#121214" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
  </g>

  <!-- Wordmark Brand RON -->
  <text x="160" y="560" text-anchor="middle" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="6" fill="${logoColor}">RON</text>
</svg>`;
}

// 1. Matte Black
fs.writeFileSync(path.join(assetsDir, 'case-matte-black.svg'), buildPhoneSVG({
  id: 'matte-black',
  bodyColor: '#1A191B',
  lensRingColor: '#28272A',
  lensBg: '#0E0E10',
  logoColor: 'rgba(255,255,255,0.45)'
}));

// 2. Stone Gray
fs.writeFileSync(path.join(assetsDir, 'case-stone-gray.svg'), buildPhoneSVG({
  id: 'stone-gray',
  bodyColor: '#6E6D76',
  lensRingColor: '#56555E',
  lensBg: '#19181C',
  logoColor: 'rgba(255,255,255,0.6)'
}));

// 3. Deep Blue
fs.writeFileSync(path.join(assetsDir, 'case-deep-blue.svg'), buildPhoneSVG({
  id: 'deep-blue',
  bodyColor: '#1B293C',
  lensRingColor: '#142030',
  lensBg: '#0D1520',
  logoColor: 'rgba(255,255,255,0.5)'
}));

// 4. Sand Beige
fs.writeFileSync(path.join(assetsDir, 'case-sand-beige.svg'), buildPhoneSVG({
  id: 'sand-beige',
  bodyColor: '#D3C9B6',
  lensRingColor: '#BAAE99',
  lensBg: '#28231C',
  logoColor: 'rgba(50,42,34,0.65)'
}));

// 5. Carbon Fiber (Diagonal Twill Weave)
const carbonPattern = `
  <pattern id="carbon-twill" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect width="16" height="16" fill="#181719"/>
    <path d="M0 0h8v8H0z" fill="#242326"/>
    <path d="M8 8h8v8H8z" fill="#242326"/>
    <path d="M0 8h8v8H0z" fill="#121113"/>
    <path d="M8 0h8v8H8z" fill="#121113"/>
    <line x1="0" y1="0" x2="16" y2="16" stroke="rgba(255,255,255,0.08)" stroke-width="1.2"/>
    <line x1="8" y1="0" x2="16" y2="8" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  </pattern>
`;
fs.writeFileSync(path.join(assetsDir, 'case-carbon-fiber.svg'), buildPhoneSVG({
  id: 'carbon-fiber',
  bodyColor: '#181719',
  bodyFill: 'url(#carbon-twill)',
  bodyPattern: carbonPattern,
  lensRingColor: '#2B2A2E',
  lensBg: '#0A0A0C',
  logoColor: 'rgba(255,255,255,0.7)'
}));

// 6. Good Vibes Only (Typographic Quote)
const goodVibesArtwork = `
  <rect x="20" y="20" width="280" height="600" fill="#141316" />
  <g transform="translate(160, 360)">
    <text x="0" y="-50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="#FFFFFF">GOOD</text>
    <text x="0" y="0" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="#FFFFFF">VIBES</text>
    <text x="0" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="#FFFFFF">ONLY</text>
    <line x1="-60" y1="85" x2="60" y2="85" stroke="#5336CC" stroke-width="3" stroke-linecap="round" />
  </g>
`;
fs.writeFileSync(path.join(assetsDir, 'case-design-goodvibes.svg'), buildPhoneSVG({
  id: 'goodvibes',
  bodyColor: '#141316',
  artworkContent: goodVibesArtwork,
  lensRingColor: '#252427',
  lensBg: '#0A0A0C'
}));

// 7. Topography Gold (Luxury Elevation Lines)
const topographyArtwork = `
  <rect x="20" y="20" width="280" height="600" fill="#201F22" />
  <g fill="none" stroke="#D4AF37" stroke-width="1.4" opacity="0.82">
    <path d="M-10 180 Q80 140 160 200 T330 180" />
    <path d="M-10 210 Q70 170 160 230 T330 220" />
    <path d="M-10 250 Q100 200 170 270 T330 260" />
    <path d="M-10 290 Q60 250 160 310 T330 300" />
    <path d="M-10 330 Q120 280 180 350 T330 340" />
    <path d="M-10 370 Q80 320 160 390 T330 380" />
    <path d="M-10 410 Q140 360 190 430 T330 420" />
    <path d="M-10 450 Q90 400 170 470 T330 460" />
    <path d="M-10 490 Q130 440 200 510 T330 500" />
    <circle cx="160" cy="340" r="45" stroke="#E6CA65" stroke-dasharray="4 4" />
    <circle cx="160" cy="340" r="25" stroke="#E6CA65" stroke-width="1" />
    <text x="160" y="344" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8" fill="#E6CA65" font-weight="700">3840m</text>
  </g>
`;
fs.writeFileSync(path.join(assetsDir, 'case-design-topography.svg'), buildPhoneSVG({
  id: 'topography',
  bodyColor: '#201F22',
  artworkContent: topographyArtwork,
  lensRingColor: '#2A292D',
  lensBg: '#0D0D10'
}));

// 8. Alpine Monochrome (Moody Mountain Peak Landscape)
const alpineArtwork = `
  <rect x="20" y="20" width="280" height="600" fill="#171619" />
  <g opacity="0.95">
    <!-- Mountain Background Layer -->
    <polygon points="20,420 90,260 170,340 240,240 300,320 300,620 20,620" fill="#242327" />
    <!-- Foreground Mountain Peaks -->
    <polygon points="20,460 120,320 180,390 260,290 300,380 300,620 20,620" fill="#1C1B1E" />
    <!-- Snow caps / Highlights -->
    <polygon points="120,320 100,350 140,350" fill="#FFFFFF" opacity="0.9" />
    <polygon points="240,240 220,270 255,270" fill="#FFFFFF" opacity="0.85" />
    <polygon points="260,290 245,315 275,315" fill="#FFFFFF" opacity="0.88" />
    <!-- Gradient Mist -->
    <rect x="20" y="440" width="280" height="180" fill="url(#alpine-mist)" />
  </g>
  <defs>
    <linearGradient id="alpine-mist" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="100%" stop-color="#171619" stop-opacity="0.9" />
    </linearGradient>
  </defs>
`;
fs.writeFileSync(path.join(assetsDir, 'case-design-alpine.svg'), buildPhoneSVG({
  id: 'alpine',
  bodyColor: '#171619',
  artworkContent: alpineArtwork,
  lensRingColor: '#252427',
  lensBg: '#0E0D10'
}));

// 9. White Marble (Carrara Marble with Grey/Gold Veins)
const marbleArtwork = `
  <rect x="20" y="20" width="280" height="600" fill="#F7F6FA" />
  <g fill="none" stroke-linecap="round" opacity="0.55">
    <!-- Grey Veins -->
    <path d="M30 40 Q110 160 80 280 T160 420 T230 580" stroke="#9A96A4" stroke-width="2.5" />
    <path d="M80 180 Q140 240 220 260" stroke="#A7A3B1" stroke-width="1.8" />
    <path d="M120 360 Q70 440 40 520" stroke="#8F8B9B" stroke-width="1.6" />
    <path d="M190 120 Q240 180 270 320" stroke="#B0ACB9" stroke-width="2" />
    <!-- Subtle Gold Vein -->
    <path d="M35 45 Q115 165 85 285 T165 425 T235 585" stroke="#CBB178" stroke-width="1" opacity="0.8" />
  </g>
`;
fs.writeFileSync(path.join(assetsDir, 'case-design-marble.svg'), buildPhoneSVG({
  id: 'marble',
  bodyColor: '#F7F6FA',
  artworkContent: marbleArtwork,
  lensRingColor: '#D3CFDC',
  lensBg: '#36343C',
  logoColor: 'rgba(50,48,56,0.6)'
}));

// 10. Geometric Fir Tree (Minimalist Line Art)
const treeArtwork = `
  <rect x="20" y="20" width="280" height="600" fill="#18181B" />
  <g transform="translate(160, 360)" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
    <!-- Geometric Triangle Pine Tree -->
    <polygon points="0,-100 -35,-50 35,-50" />
    <polygon points="0,-60 -50,0 50,0" />
    <polygon points="0,-10 -65,60 65,60" />
    <!-- Trunk -->
    <line x1="0" y1="60" x2="0" y2="100" stroke-width="3" />
    <!-- Minimalist Sun & Coordinates -->
    <circle cx="0" cy="-130" r="14" stroke="#5336CC" stroke-width="2" />
    <text x="0" y="130" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="#8B77A4" letter-spacing="3" stroke="none">45°20'N  121°42'W</text>
  </g>
`;
fs.writeFileSync(path.join(assetsDir, 'case-design-tree.svg'), buildPhoneSVG({
  id: 'tree',
  bodyColor: '#18181B',
  artworkContent: treeArtwork,
  lensRingColor: '#262529',
  lensBg: '#0A0A0C'
}));

// 11. Vibrant Geo Art (Modern Bauhaus / Stained Glass Geometry)
const geoArtArtwork = `
  <rect x="20" y="20" width="280" height="600" fill="#1C182A" />
  <g transform="translate(20, 160)">
    <polygon points="0,0 140,0 70,120" fill="#5336CC" opacity="0.9" />
    <polygon points="140,0 280,0 210,120" fill="#EA4335" opacity="0.85" />
    <polygon points="70,120 210,120 140,240" fill="#FBBC04" opacity="0.9" />
    <polygon points="0,0 70,120 0,240" fill="#34A853" opacity="0.85" />
    <polygon points="280,0 210,120 280,240" fill="#8B77A4" opacity="0.9" />
    <polygon points="0,240 140,240 70,360" fill="#252425" opacity="0.9" />
    <polygon points="140,240 280,240 210,360" fill="#5336CC" opacity="0.8" />
  </g>
`;
fs.writeFileSync(path.join(assetsDir, 'case-design-geoart.svg'), buildPhoneSVG({
  id: 'geoart',
  bodyColor: '#1C182A',
  artworkContent: geoArtArtwork,
  lensRingColor: '#2C273C',
  lensBg: '#100D18'
}));

// 12. Floating 3D Basalt Rocks (Faceted Polygonal Formations)
function buildRockSVG({ id, width, height, facets }) {
  const facetPolygons = facets.map(f =>
    `<polygon points="${f.pts}" fill="${f.fill}" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />`
  ).join('\n    ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="rock-shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>
  <g filter="url(#rock-shadow-${id})">
    ${facetPolygons}
  </g>
</svg>`;
}

// Rock 1: Large Floating Asteroid Boulder
fs.writeFileSync(path.join(assetsDir, 'rock-1.svg'), buildRockSVG({
  id: 'rock1',
  width: 180,
  height: 180,
  facets: [
    { pts: '40,60 90,20 140,50 90,90', fill: '#48474B' }, // Top light facet
    { pts: '90,20 140,50 160,110 120,130', fill: '#363539' }, // Right specular
    { pts: '40,60 90,90 70,140 20,110', fill: '#2A292C' }, // Left shadow
    { pts: '90,90 120,130 90,160 70,140', fill: '#1E1D20' }, // Bottom dark facet
    { pts: '120,130 160,110 150,150 90,160', fill: '#171618' }, // Bottom right
    { pts: '20,110 70,140 50,160 20,110', fill: '#141315' } // Bottom left
  ]
}));

// Rock 2: Medium Shard
fs.writeFileSync(path.join(assetsDir, 'rock-2.svg'), buildRockSVG({
  id: 'rock2',
  width: 130,
  height: 140,
  facets: [
    { pts: '60,15 110,45 80,85 30,50', fill: '#4E4D52' },
    { pts: '110,45 125,95 85,125 80,85', fill: '#3A393E' },
    { pts: '30,50 80,85 55,125 15,85', fill: '#252427' },
    { pts: '80,85 85,125 55,125', fill: '#1C1B1E' }
  ]
}));

// Rock 3: Small Fragment
fs.writeFileSync(path.join(assetsDir, 'rock-3.svg'), buildRockSVG({
  id: 'rock3',
  width: 90,
  height: 90,
  facets: [
    { pts: '45,10 75,35 50,65 20,40', fill: '#525157' },
    { pts: '75,35 85,65 60,80 50,65', fill: '#38373B' },
    { pts: '20,40 50,65 35,80 10,60', fill: '#201F22' },
    { pts: '50,65 60,80 35,80', fill: '#161517' }
  ]
}));

// Rock 4: Pebble Micro-Fragment
fs.writeFileSync(path.join(assetsDir, 'rock-4.svg'), buildRockSVG({
  id: 'rock4',
  width: 60,
  height: 60,
  facets: [
    { pts: '30,8 50,24 35,45 15,28', fill: '#58575E' },
    { pts: '50,24 55,46 38,54 35,45', fill: '#3E3D42' },
    { pts: '15,28 35,45 22,54 8,40', fill: '#252427' }
  ]
}));

console.log('All SVG phone cases and floating rocks generated in assets directory successfully!');
