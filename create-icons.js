const fs = require('fs');
const path = require('path');

const icons = [
  { name: 'icon_home.png', color: '#999999' },
  { name: 'icon_home_active.png', color: '#FF6B6B' },
  { name: 'icon_community.png', color: '#999999' },
  { name: 'icon_community_active.png', color: '#FF6B6B' }
];

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function createPng(width, height, r, g, b) {
  const png = [];
  png.push(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A);
  
  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    const table = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
    }
    for (let i = 0; i < buf.length; i++) {
      crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  
  function addChunk(type, data) {
    const length = [data.length >>> 24, (data.length >>> 16) & 0xFF, (data.length >>> 8) & 0xFF, data.length & 0xFF];
    const typeData = [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3), ...data];
    const crc = crc32(typeData);
    png.push(...length, ...typeData, crc >>> 24, (crc >>> 16) & 0xFF, (crc >>> 8) & 0xFF, crc & 0xFF);
  }
  
  const ihdr = [
    width >>> 24, (width >>> 16) & 0xFF, (width >>> 8) & 0xFF, width & 0xFF,
    height >>> 24, (height >>> 16) & 0xFF, (height >>> 8) & 0xFF, height & 0xFF,
    8, 6, 0, 0, 0
  ];
  addChunk('IHDR', ihdr);
  
  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0);
    for (let x = 0; x < width; x++) {
      rawData.push(r, g, b, 255);
    }
  }
  
  const { deflateSync } = require('zlib');
  const compressed = deflateSync(Buffer.from(rawData));
  const compressedArray = Array.from(compressed);
  addChunk('IDAT', compressedArray);
  addChunk('IEND', []);
  
  return Buffer.from(png);
}

const outputDir = 'images';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

icons.forEach(icon => {
  const rgb = hexToRgb(icon.color);
  const pngBuffer = createPng(48, 48, rgb.r, rgb.g, rgb.b);
  fs.writeFileSync(path.join(outputDir, icon.name), pngBuffer);
  console.log(`Created: ${icon.name}`);
});

console.log('All icons created successfully!');