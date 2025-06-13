function getColor(severity, score) {
  const baseColors = {
    low: '#A8D5BA',
    moderate: '#FFE28A',
    medium: '#FFB347',
    high: '#FF6F61',
    critical: '#D32F2F',
  };

  // Clamp score from 0–100
  score = Math.max(0, Math.min(100, score));
  
  // Convert HEX to HSL
  const baseHex = baseColors[severity.toLowerCase()];
  const hsl = hexToHSL(baseHex);

  // Increase darkness by reducing lightness
  const darkened = {
    h: hsl.h,
    s: hsl.s,
    l: hsl.l - (hsl.l * (score / 100) * 0.5), // Darken up to 50%
  };

  return `hsl(${darkened.h}, ${darkened.s}%, ${darkened.l}%)`;
}

function hexToHSL(H) {
  let r = 0, g = 0, b = 0;
  if (H.length === 7) {
    r = parseInt(H.slice(1, 3), 16) / 255;
    g = parseInt(H.slice(3, 5), 16) / 255;
    b = parseInt(H.slice(5, 7), 16) / 255;
  }
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h = Math.round(h * 60);
  }
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}
