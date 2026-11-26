// Hand-drawn style chapter illustrations for the printable book.
// Simple flat SVG so they print crisp at any size. Keyed by top-level chapter name.
// A chapter without its own picture falls back to DEFAULT.

const INK = "#3b2414";
const S = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

const wrap = inner => `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="100" cy="146" rx="78" ry="8" fill="#e6d3ae"/>
  ${inner}
</svg>`;

const steam = (x, y) => `<path d="M${x} ${y}c-6-8 6-12 0-20s6-12 0-20" fill="none" stroke="#b9a487" stroke-width="3" stroke-linecap="round"/>`;

export const ART = {
  "Breakfast": wrap(`
    <path d="M150 104h38" ${S} fill="none"/><rect x="176" y="98" width="20" height="12" rx="5" fill="#7a3e1d" ${S}/>
    <ellipse cx="100" cy="104" rx="62" ry="34" fill="#4a4a4a" ${S}/>
    <ellipse cx="100" cy="100" rx="52" ry="26" fill="#2f2f2f"/>
    <path d="M62 92c10-10 22-4 30-10 9-6 20 2 18 12-2 11-18 14-30 12-13-2-26-4-18-14z" fill="#fff" ${S}/>
    <circle cx="86" cy="94" r="9" fill="#f4b223" ${S}/>
    <path d="M104 100c8-12 18-4 28-10 9-5 18 4 12 13-6 10-20 10-30 8-9-2-15-4-10-11z" fill="#fff" ${S}/>
    <circle cx="124" cy="99" r="8" fill="#f4b223" ${S}/>
    <path d="M70 112c10 4 16-4 26 0s16-4 26 0" fill="none" stroke="#b5452a" stroke-width="7" stroke-linecap="round"/>
    <path d="M78 122c10 4 16-4 26 0s16-4 26 0" fill="none" stroke="#c9623f" stroke-width="7" stroke-linecap="round"/>
    ${steam(84, 60)}${steam(116, 56)}`),

  "Quick Dinners": wrap(`
    <path d="M136 30l-50 70M152 34l-56 68" stroke="#c98a2b" stroke-width="6" stroke-linecap="round"/>
    <path d="M40 92h120c0 30-26 50-60 50S40 122 40 92z" fill="#b5452a" ${S}/>
    <path d="M52 108h96" stroke="#f3e9d2" stroke-width="4" stroke-dasharray="8 6"/>
    <ellipse cx="100" cy="92" rx="60" ry="12" fill="#f2d48a" ${S}/>
    <path d="M62 90c8-8 14 6 22-2s14 6 22-2 14 6 22-2" fill="none" stroke="#d9a441" stroke-width="3"/>
    <circle cx="74" cy="86" r="5" fill="#6aa84f" ${S}/><circle cx="122" cy="84" r="5" fill="#6aa84f" ${S}/>
    <ellipse cx="98" cy="84" rx="9" ry="5" fill="#fff" ${S}/><circle cx="98" cy="84" r="3" fill="#f4b223"/>
    ${steam(80, 62)}${steam(112, 58)}`),

  "Pasta & Mains": wrap(`
    <ellipse cx="100" cy="112" rx="76" ry="24" fill="#fff" ${S}/>
    <ellipse cx="100" cy="108" rx="54" ry="15" fill="#f2d48a"/>
    <path d="M60 106c10-10 20 8 30-2s20 8 30-2 16 6 22 0" fill="none" stroke="#d9a441" stroke-width="4"/>
    <path d="M66 112c10-8 20 6 30-2s20 6 30-2" fill="none" stroke="#d9a441" stroke-width="4"/>
    <path d="M78 98c6-14 30-14 40-2 6 8-6 14-20 14S74 106 78 98z" fill="#c0392b" ${S}/>
    <circle cx="90" cy="100" r="7" fill="#7a3e1d" ${S}/><circle cx="108" cy="98" r="7" fill="#7a3e1d" ${S}/>
    <path d="M94 90l4-6 4 6" fill="#6aa84f" ${S}/>
    <path d="M150 30v70" ${S}/><path d="M142 30v18c0 6 16 6 16 0V30" fill="none" ${S}/><path d="M150 30v18" ${S}/>`),

  "Soups": wrap(`
    <rect x="44" y="70" width="112" height="66" rx="12" fill="#c0392b" ${S}/>
    <rect x="30" y="80" width="16" height="10" rx="4" fill="#7a3e1d" ${S}/><rect x="154" y="80" width="16" height="10" rx="4" fill="#7a3e1d" ${S}/>
    <ellipse cx="100" cy="70" rx="58" ry="10" fill="#e67e22" ${S}/>
    <circle cx="80" cy="68" r="4" fill="#6aa84f"/><circle cx="112" cy="70" r="4" fill="#f4b223"/><circle cx="96" cy="66" r="3" fill="#fff"/>
    <path d="M128 70l26-46" stroke="#c98a2b" stroke-width="6" stroke-linecap="round"/><ellipse cx="156" cy="20" rx="8" ry="5" fill="#c98a2b" ${S}/>
    <path d="M60 100h80" stroke="#f3e9d2" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
    ${steam(76, 54)}${steam(100, 50)}`),

  "Sauces & Salsas": wrap(`
    <path d="M40 104h80c0 22-18 36-40 36s-40-14-40-36z" fill="#8d8d8d" ${S}/>
    <ellipse cx="80" cy="104" rx="40" ry="10" fill="#c0392b" ${S}/>
    <circle cx="68" cy="102" r="4" fill="#6aa84f"/><circle cx="88" cy="104" r="3" fill="#fff"/><circle cx="80" cy="100" r="3" fill="#f4b223"/>
    <rect x="128" y="62" width="40" height="76" rx="8" fill="#e8f0e2" ${S}/>
    <rect x="130" y="80" width="36" height="56" rx="6" fill="#d35400"/>
    <rect x="124" y="52" width="48" height="14" rx="4" fill="#7a3e1d" ${S}/>
    <rect x="134" y="94" width="28" height="18" rx="3" fill="#f3e9d2" ${S}/>
    <path d="M38 52c10-14 30-12 36 2-12 6-28 8-36-2z" fill="#c0392b" ${S}/><path d="M74 52c4-2 6-6 6-10" fill="none" stroke="#6aa84f" stroke-width="4" stroke-linecap="round"/>`),

  "Tacos": wrap(`
    <path d="M30 126c0-44 30-72 70-72s70 28 70 72z" fill="#f2c14e" ${S}/>
    <path d="M44 122c4-30 26-52 56-52" fill="none" stroke="#d9a441" stroke-width="3"/>
    <path d="M46 92c10-14 20-4 30-12s22 2 30-8 22 2 30-4 18 8 22 14" fill="none" stroke="#6aa84f" stroke-width="10" stroke-linecap="round"/>
    <path d="M56 98c14-6 22 4 40-2s30 2 48-2" fill="none" stroke="#8e3b1f" stroke-width="10" stroke-linecap="round"/>
    <circle cx="70" cy="86" r="5" fill="#c0392b"/><circle cx="104" cy="80" r="5" fill="#c0392b"/><circle cx="134" cy="86" r="5" fill="#c0392b"/>
    <circle cx="88" cy="90" r="3" fill="#fff"/><circle cx="122" cy="92" r="3" fill="#fff"/>
    <path d="M150 40c8 0 14 6 14 14-8 0-14-6-14-14z" fill="#9bc53d" ${S}/>`),

  "Fire": wrap(`
    <path d="M100 18c10 22 34 30 34 58 0 20-16 34-34 34S66 96 66 76c0-14 8-22 14-30 2 12 8 16 12 16-2-18 0-32 8-44z" fill="#e67e22" ${S}/>
    <path d="M100 56c6 12 18 16 18 30 0 10-8 18-18 18s-18-8-18-18c0-8 6-12 8-16 2 6 4 8 6 8 0-10 0-16 4-22z" fill="#f4b223"/>
    <path d="M36 112h128" ${S}/><path d="M40 112c0 16 26 26 60 26s60-10 60-26" fill="#3b3b3b" ${S}/>
    <path d="M52 104h96M52 96h96" stroke="#7d7d7d" stroke-width="3"/>
    <path d="M60 138l-8 10M140 138l8 10" ${S}/>`),

  "Seafood": wrap(`
    <path d="M30 86c24-34 84-40 112 0-28 40-88 34-112 0z" fill="#5d9cc9" ${S}/>
    <path d="M142 86l30-22v44z" fill="#3d7aa5" ${S}/>
    <circle cx="56" cy="80" r="6" fill="#fff" ${S}/><circle cx="56" cy="80" r="2.5" fill="${INK}"/>
    <path d="M74 66c4 12 4 28 0 40" fill="none" ${S}/>
    <path d="M88 76l8 6-8 6M104 76l8 6-8 6M120 76l8 6-8 6" fill="none" stroke="#2c5f84" stroke-width="2.5"/>
    <path d="M40 92c6 4 14 4 18 0" fill="none" ${S}/>
    <circle cx="164" cy="36" r="5" fill="none" stroke="#5d9cc9" stroke-width="2.5"/><circle cx="176" cy="22" r="3.5" fill="none" stroke="#5d9cc9" stroke-width="2.5"/>
    <path d="M34 128c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0" fill="none" stroke="#5d9cc9" stroke-width="3"/>
    <path d="M150 112c6 0 10 4 12 10M150 112c4 6 2 12-2 16" fill="#f3a683" ${S}/>`),

  "Salads & Dressings": wrap(`
    <path d="M34 96h132c0 28-30 44-66 44S34 124 34 96z" fill="#f3e9d2" ${S}/>
    <path d="M44 96c-4-18 10-28 22-20 2-14 20-18 28-6 8-12 28-8 28 6 12-8 28 2 24 20z" fill="#6aa84f" ${S}/>
    <circle cx="70" cy="88" r="9" fill="#c0392b" ${S}/><circle cx="128" cy="86" r="8" fill="#c0392b" ${S}/>
    <path d="M94 84c6-4 12-4 18 0-6 4-12 4-18 0z" fill="#fff" ${S}/>
    <path d="M150 20v18c0 4-14 10-14 24v20h28V62c0-14-14-20-14-24" fill="#f4d35e" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="145" y="12" width="10" height="10" rx="2" fill="#7a3e1d" ${S}/>`),

  "Sides": wrap(`
    <ellipse cx="78" cy="112" rx="50" ry="24" fill="#a0673b" ${S}/>
    <path d="M42 106c12-14 60-14 72 0-8 10-64 10-72 0z" fill="#f7e7b4" ${S}/>
    <rect x="68" y="88" width="18" height="12" rx="2" fill="#f4d35e" ${S}/>
    <path d="M60 98l2-4M96 98l-2-4" stroke="#6aa84f" stroke-width="3" stroke-linecap="round"/>
    <path d="M130 70c4-14 30-14 34 0l6 60h-46z" fill="#f2c14e" ${S}/>
    <path d="M136 70l-2-30M144 68l0-34M152 68l2-30M160 70l4-28" stroke="#e8a33d" stroke-width="7" stroke-linecap="round"/>
    <path d="M128 100h44" stroke="#c0392b" stroke-width="12"/>`),

  "Desserts": wrap(`
    <path d="M74 80l26 62 26-62z" fill="#d9a441" ${S}/>
    <path d="M82 92l30 0M86 104l22 0M92 116l12 0M84 82l22 50M116 82l-22 50" stroke="#a8742b" stroke-width="2"/>
    <circle cx="100" cy="70" r="28" fill="#f7cac9" ${S}/>
    <circle cx="82" cy="52" r="20" fill="#7a3e1d" ${S}/><circle cx="118" cy="52" r="20" fill="#fdf1d6" ${S}/>
    <circle cx="100" cy="30" r="10" fill="#c0392b" ${S}/><path d="M100 20c2-8 8-10 12-10" fill="none" ${S}/>
    <path d="M70 60l4 2M88 44l3 3M114 46l-3 3M124 58l3-3M96 74l4 0" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`),
};

export const DEFAULT = wrap(`
  <path d="M62 50h76l-6 86H68z" fill="#f3e9d2" ${S}/>
  <path d="M100 96s-18-11-18-24c0-7 5-12 11-12 3 0 6 2 7 4 1-2 4-4 7-4 6 0 11 5 11 12 0 13-18 24-18 24z" fill="#c0392b" ${S}/>
  ${steam(86, 40)}${steam(114, 36)}`);

export const FLOURISH = `<svg viewBox="0 0 120 14" width="120" height="14" aria-hidden="true"><path d="M2 7h44M74 7h44" stroke="#c98a2b" stroke-width="1.5"/><path d="M60 13s-8-4.9-8-10.8C52 0 54.5 0 56 0c2 0 3 .8 4 2 1-1.2 2-2 4-2 1.5 0 4 0 4 2.2C68 8.1 60 13 60 13z" fill="#c98a2b"/></svg>`;
