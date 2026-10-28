// Deterministic per seed, so the server and browser render the same layout.
export function random(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Loose grid with jitter: spots as percentages of the desk, plus the desk height in rem.
export function scatter(count, cols, rowHeight) {
  const rows = Math.ceil(count / cols);
  const spots = Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / cols);
    const inRow = Math.min(cols, count - row * cols);
    const col = (i % cols) + (cols - inRow) / 2; // center a short last row
    const jx = (random(i * 7 + cols) - 0.5) * 0.5;
    const jy = (random(i * 13 + cols) - 0.5) * 0.4;
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    return {
      left: clamp(((col + 0.5 + jx) / cols) * 100, 14, 86),
      top: clamp(((row + 0.5 + jy) / rows) * 100, 12, 88),
    };
  });
  return { spots, height: rows * rowHeight };
}
