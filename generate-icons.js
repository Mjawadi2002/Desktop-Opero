/**
 * Generate Teamyy desktop app icons (icon.png + tray-icon.png) from the
 * new branding mark. Run with: `node generate-icons.js`
 */
const sharp = require('sharp');
const path  = require('path');

// Square app icon — Teamyy mark centered on the dark brand background
const appIconSVG = `<svg width="512" height="512" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100" height="100" rx="20" fill="#0C0B1A"/>
  <g transform="translate(14, 18)">
    <rect x="0"  y="0"  width="72" height="16" rx="4" fill="#7B6CF0"/>
    <rect x="20" y="24" width="32" height="16" rx="4" fill="#9B8FF4" opacity="0.85"/>
    <rect x="20" y="48" width="32" height="16" rx="4" fill="#B8AEFF" opacity="0.6"/>
    <circle cx="7"  cy="8"  r="3" fill="#FFFFFF" opacity="0.18"/>
    <circle cx="36" cy="32" r="3" fill="#FFFFFF" opacity="0.13"/>
    <circle cx="36" cy="56" r="3" fill="#FFFFFF" opacity="0.08"/>
  </g>
</svg>`;

// Tray icon — Teamyy mark only, transparent background (lets the OS chrome
// show through correctly in both light and dark system themes)
const trayIconSVG = `<svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(14, 18)">
    <rect x="0"  y="0"  width="72" height="16" rx="4" fill="#7B6CF0"/>
    <rect x="20" y="24" width="32" height="16" rx="4" fill="#9B8FF4"/>
    <rect x="20" y="48" width="32" height="16" rx="4" fill="#B8AEFF"/>
  </g>
</svg>`;

async function run() {
    const outDir = path.join(__dirname, 'assets');

    await sharp(Buffer.from(appIconSVG))
        .resize(512, 512)
        .png()
        .toFile(path.join(outDir, 'icon.png'));
    console.log('Wrote', path.join(outDir, 'icon.png'));

    await sharp(Buffer.from(trayIconSVG))
        .resize(32, 32)
        .png()
        .toFile(path.join(outDir, 'tray-icon.png'));
    console.log('Wrote', path.join(outDir, 'tray-icon.png'));
}

run().catch(err => { console.error(err); process.exit(1); });
