// A small temple front in line art, drawn to the classical Tuscan rules (Vignola, after
// Vitruvius), with D as the column's width at its base:
//   column 5 1/2 D tall here, stockier than Tuscan's 7 D (base and capital half a D each),
//   plain shaft, tapering in its top two thirds
//   gaps between columns 2 1/4 D ("eustyle", the spacing Vitruvius called the most beautiful)
//   beam (architrave, frieze, cornice) about a quarter of the column's height
//   roof height about a ninth of its width
// The frieze keeps a band of grooves and square openings, still and empty.
//
// Every piece is its own <svg> placed with the TEMPLE layout, so the page can position,
// animate, and attach handlers to each. Strokes use the text color and fills use the page
// color, so the art follows the theme. Each stroke has pathLength 1 so it can draw itself in.

const paper = "var(--background)";
const D = 100;

const columnArt = { width: 136, height: 5.5 * D };
const shaftEnd = columnArt.height - 50; // the base is the last half D
const along = (share) => Math.round(52 + (shaftEnd - 52) * share);
const centers = [125, 450, 775]; // 3 1/4 D apart, which leaves 2 1/4 D between shafts
const beamX = centers[0] - 62.5;
const beamWidth = centers[2] - centers[0] + 125;

const pedimentWidth = beamWidth + 40;
const pedimentHeight = Math.round(pedimentWidth / 9) + 14;

const top = 30;
const pediment = { x: beamX - 20, y: top, width: pedimentWidth, height: pedimentHeight };
const cornice = { x: beamX - 20, y: top + pedimentHeight, width: pedimentWidth, height: 25 };
const frieze = { x: beamX, y: cornice.y + cornice.height, width: beamWidth, height: 84, tileWidth: 120 };
const architrave = { x: beamX, y: frieze.y + frieze.height, width: beamWidth, height: 56 };
const columnTop = architrave.y + architrave.height;
const steps = { x: 22, y: columnTop + columnArt.height, width: 856, height: 66 };

export const TEMPLE = {
  width: 900,
  height: steps.y + steps.height + 4,
  pediment,
  cornice,
  frieze,
  metope: { x: 44, y: 8, width: 68, height: 68 }, // inside one frieze tile
  architrave,
  columns: centers.map((c) => ({ x: c - columnArt.width / 2, y: columnTop, ...columnArt })),
  columnCenters: centers,
  steps,
};

function svgViewport({ width, height }) {
  return { xmlns: "http://www.w3.org/2000/svg", viewBox: `0 0 ${width} ${height}`, overflow: "visible" };
}

function Stroke({ d, fill = "none" }) {
  return (
    <path
      d={d}
      fill={fill}
      stroke="currentColor"
      strokeWidth={1.5}
      vectorEffect="non-scaling-stroke"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
    />
  );
}

export function Steps(props) {
  const { width: w } = steps;
  return (
    <svg {...svgViewport(steps)} {...props} aria-hidden="true">
      <Stroke fill={paper} d={`M 28 0 H ${w - 28} V 22 H ${w - 14} V 44 H ${w} V 66 H 0 V 44 H 14 V 22 H 28 Z`} />
      <Stroke d={`M 28 22 H ${w - 28}`} />
      <Stroke d={`M 14 44 H ${w - 14}`} />
    </svg>
  );
}

// Abacus, echinus, and necking ring; a plain shaft; then a torus on a square plinth.
export function Column(props) {
  return (
    <svg {...svgViewport(columnArt)} {...props} aria-hidden="true">
      <Stroke fill={paper} d={`M 27 52 H 109 C 112 ${along(0.33)} 118 ${along(0.62)} 118 ${shaftEnd} H 18 C 18 ${along(0.62)} 24 ${along(0.33)} 27 52 Z`} />
      <Stroke fill={paper} d="M 22 42 H 114 Q 118 47 114 52 H 22 Q 18 47 22 42 Z" />
      <Stroke fill={paper} d="M 8 25 H 128 C 126 34 120 40 114 42 H 22 C 16 40 10 34 8 25 Z" />
      <Stroke fill={paper} d="M 5.5 0 H 130.5 V 25 H 5.5 Z" />
      <g transform={`translate(0 ${shaftEnd - 650})`}>
        <Stroke fill={paper} d="M 18 650 H 118 C 128 652 128 673 120 675 H 16 C 8 673 8 652 18 650 Z" />
        <Stroke fill={paper} d="M 1.5 675 H 134.5 V 700 H 1.5 Z" />
      </g>
    </svg>
  );
}

export function Architrave(props) {
  const { width: w, height: h } = architrave;
  return (
    <svg {...svgViewport(architrave)} {...props} aria-hidden="true">
      <Stroke fill={paper} d={`M 0 0 H ${w} V ${h} H 0 Z`} />
      <Stroke d={`M 0 ${Math.round(h / 3)} H ${w}`} />
    </svg>
  );
}

const m = TEMPLE.metope;
const metopeOutline = `M ${m.x} ${m.y} h ${m.width} v ${m.height} h ${-m.width} Z`;
const tile = { width: frieze.tileWidth, height: frieze.height };

// One repeating piece of the frieze: three grooves and a square opening the photo shows through.
export function FriezeTile(props) {
  return (
    <svg {...svgViewport(tile)} {...props} aria-hidden="true">
      <path
        d={`M 0 0 H ${tile.width} V ${tile.height} H 0 Z ${metopeOutline}`}
        fill={paper}
        fillRule="evenodd"
        stroke="none"
        pathLength={1}
      />
      <Stroke d={`M 0 0 H ${tile.width}`} />
      <Stroke d={`M 0 ${tile.height} H ${tile.width}`} />
      {[12, 22, 32].map((x) => (
        <Stroke key={x} d={`M ${x} 12 V 72`} />
      ))}
      <Stroke d={metopeOutline} />
    </svg>
  );
}

export function Cornice(props) {
  const { width: w, height: h } = cornice;
  return (
    <svg {...svgViewport(cornice)} {...props} aria-hidden="true">
      <Stroke fill={paper} d={`M 0 0 H ${w} V 8 C ${w - 6} 8 ${w - 10} 12 ${w - 12} ${h} H 12 C 10 12 6 8 0 8 Z`} />
      <Stroke d={`M 0 8 H ${w}`} />
    </svg>
  );
}

// The roof: a low triangle, with the inner triangle set back from its edges.
export function Pediment(props) {
  const { width: w, height: h } = pediment;
  return (
    <svg {...svgViewport(pediment)} {...props} aria-hidden="true">
      <Stroke fill={paper} d={`M 0 ${h} L ${w / 2} 0 L ${w} ${h} Z`} />
      <Stroke d={`M 46 ${h - 6} L ${w / 2} 13 L ${w - 46} ${h - 6} Z`} />
    </svg>
  );
}
