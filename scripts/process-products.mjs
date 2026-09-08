import { Jimp } from 'jimp';
import path from 'path';

async function processProducts() {
  const uploadDir = 'C:/Users/alrfa/.gemini/antigravity-ide/brain/fb1a28ae-eb7e-4a3a-905b-916dc2d34cc8/.user_uploaded';
  const outDir = path.resolve('public/assets/products');

  // 1. Process Power Bank (media_1788907985034.jpg)
  console.log('Processing Power Bank image...');
  const pbPath = path.join(uploadDir, 'media_1788907985034.jpg');
  const pb = await Jimp.read(pbPath);

  // Remove white background with soft antialiasing
  pb.scan((x, y, idx) => {
    const r = pb.bitmap.data[idx + 0];
    const g = pb.bitmap.data[idx + 1];
    const b = pb.bitmap.data[idx + 2];
    
    if (r > 240 && g > 240 && b > 240) {
      pb.bitmap.data[idx + 3] = 0; // Transparent
    } else if (r > 220 && g > 220 && b > 220) {
      const avg = (r + g + b) / 3;
      pb.bitmap.data[idx + 3] = Math.max(0, Math.min(255, Math.round((255 - avg) * 5)));
    }
  });
  pb.autocrop();
  const pbOut = path.join(outDir, 'ugreen-powerbank-real.png');
  await pb.write(pbOut);
  console.log('Saved Power Bank:', pbOut, pb.bitmap.width, 'x', pb.bitmap.height);

  // 2. Process Braided Cable (media_1788907985055.jpg)
  console.log('Processing Braided Cable image...');
  const cablePath = path.join(uploadDir, 'media_1788907985055.jpg');
  const cable = await Jimp.read(cablePath);

  cable.scan((x, y, idx) => {
    const r = cable.bitmap.data[idx + 0];
    const g = cable.bitmap.data[idx + 1];
    const b = cable.bitmap.data[idx + 2];

    if (r > 242 && g > 242 && b > 242) {
      cable.bitmap.data[idx + 3] = 0;
    } else if (r > 225 && g > 225 && b > 225) {
      const avg = (r + g + b) / 3;
      cable.bitmap.data[idx + 3] = Math.max(0, Math.min(255, Math.round((255 - avg) * 6)));
    }
  });
  cable.autocrop();
  const cableOut = path.join(outDir, 'ugreen-cable-real.png');
  await cable.write(cableOut);
  console.log('Saved Cable:', cableOut, cable.bitmap.width, 'x', cable.bitmap.height);

  // 3. Process Charger Box (media_1788907985140.jpg)
  console.log('Processing Charger Box image...');
  const chargerPath = path.join(uploadDir, 'media_1788907985140.jpg');
  const chargerRaw = await Jimp.read(chargerPath);

  // Crop the box area tightly without the "400 EGP" text
  const chargerBox = chargerRaw.clone().crop({
    x: 338,
    y: 415,
    w: 250,
    h: 388
  });

  // Remove the light background around the box
  chargerBox.scan((x, y, idx) => {
    const r = chargerBox.bitmap.data[idx + 0];
    const g = chargerBox.bitmap.data[idx + 1];
    const b = chargerBox.bitmap.data[idx + 2];

    // Near top-left/top-right corners of the hang tab
    if ((y < 35 && (x < 65 || x > 185)) || (x < 5 || x > 242)) {
      if (r > 235 && g > 235 && b > 235) {
        chargerBox.bitmap.data[idx + 3] = 0;
      }
    }
  });
  chargerBox.autocrop();

  const chargerOut = path.join(outDir, 'ugreen-charger-real.png');
  await chargerBox.write(chargerOut);
  console.log('Saved Charger:', chargerOut, chargerBox.bitmap.width, 'x', chargerBox.bitmap.height);

  console.log('All 3 real product images processed successfully!');
}

processProducts().catch(console.error);
