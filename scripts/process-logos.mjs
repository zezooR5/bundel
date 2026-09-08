import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

async function processLogos() {
  const logosDir = path.resolve('public/assets/logos');
  
  // 1. Process Elbadry Trade Logo
  console.log('Processing Elbadry Trade logo...');
  const elbadryPath = path.join(logosDir, 'elbadry-trade-logo.png');
  const elbadry = await Jimp.read(elbadryPath);

  // Scan and remove white background
  elbadry.scan((x, y, idx) => {
    const r = elbadry.bitmap.data[idx + 0];
    const g = elbadry.bitmap.data[idx + 1];
    const b = elbadry.bitmap.data[idx + 2];
    
    // Check if pixel is white or near white
    if (r > 238 && g > 238 && b > 238) {
      elbadry.bitmap.data[idx + 3] = 0; // Transparent
    } else if (r > 215 && g > 215 && b > 215) {
      // Soft antialiasing on edges
      const brightness = (r + g + b) / 3;
      const alpha = Math.max(0, Math.min(255, Math.round((255 - brightness) * 4)));
      elbadry.bitmap.data[idx + 3] = alpha;
    }
  });

  const elbadryTransparentPath = path.join(logosDir, 'elbadry-trade-transparent.png');
  await elbadry.write(elbadryTransparentPath);
  console.log('Saved:', elbadryTransparentPath);

  // 2. Process UGREEN Logo
  console.log('Processing UGREEN logo...');
  const ugreenPath = path.join(logosDir, 'ugreen-logo.jpg');
  const ugreen = await Jimp.read(ugreenPath);

  // We will create two versions:
  // (A) Standard transparent: green U icon + dark text (for light backgrounds)
  // (B) Dark-mode transparent: green U icon + crisp white text (for dark backgrounds)
  const ugreenDark = await Jimp.read(ugreenPath);

  ugreen.scan((x, y, idx) => {
    const r = ugreen.bitmap.data[idx + 0];
    const g = ugreen.bitmap.data[idx + 1];
    const b = ugreen.bitmap.data[idx + 2];
    
    if (r > 235 && g > 235 && b > 235) {
      ugreen.bitmap.data[idx + 3] = 0;
    } else if (r > 200 && g > 200 && b > 200) {
      const brightness = (r + g + b) / 3;
      const alpha = Math.max(0, Math.min(255, Math.round((255 - brightness) * 4)));
      ugreen.bitmap.data[idx + 3] = alpha;
    }
  });

  const ugreenTransparentPath = path.join(logosDir, 'ugreen-transparent.png');
  await ugreen.write(ugreenTransparentPath);
  console.log('Saved:', ugreenTransparentPath);

  // Create UGREEN for dark background (turns dark text into bright white text while keeping green leaf symbol)
  ugreenDark.scan((x, y, idx) => {
    const r = ugreenDark.bitmap.data[idx + 0];
    const g = ugreenDark.bitmap.data[idx + 1];
    const b = ugreenDark.bitmap.data[idx + 2];
    
    if (r > 235 && g > 235 && b > 235) {
      ugreenDark.bitmap.data[idx + 3] = 0;
    } else {
      // Check if this is the dark text part (r, g, b are all low and close to each other)
      const isGreenSymbol = (g > r + 30) && (g > b + 20);
      if (!isGreenSymbol && r < 120 && g < 120 && b < 120) {
        // Invert to white text!
        ugreenDark.bitmap.data[idx + 0] = 255;
        ugreenDark.bitmap.data[idx + 1] = 255;
        ugreenDark.bitmap.data[idx + 2] = 255;
      }
    }
  });

  const ugreenWhiteTextTransparentPath = path.join(logosDir, 'ugreen-white-text-transparent.png');
  await ugreenDark.write(ugreenWhiteTextTransparentPath);
  console.log('Saved:', ugreenWhiteTextTransparentPath);

  console.log('All transparent logos processed successfully!');
}

processLogos().catch(console.error);
