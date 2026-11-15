const paper = "var(--background)";
const width = 1080;
const height = 910;
// Columns are drawn 120 wide with a shaft of `shaft` units, then scaled up evenly by
// `columnScale`. A shorter shaft and a bigger scale make stockier columns.
const shaft = 260;
const columnScale = 1.3;
const columnArt = { width: 120, height: 75 + shaft + 50 };
const columnSize = { width: columnArt.width * columnScale, height: columnArt.height * columnScale };
const columnCenters = [168, 540, 912];
const tileSize = { width: 120, height: 84 };
const pediment = { x: 42, y: 24, width: 996, height: 115 };
const innerTriangle = [
  [498, 14],
  [884, 103],
  [112, 103],
];

// The boxes and triangle points use the full viewBox. The metope travels with its tile.
export const TEMPLE = {
  viewBox: `0 0 ${width} ${height}`,
  width,
  height,
  steps: { x: 24, y: 308 + columnSize.height, width: 1032, height: 66 },
  columns: columnCenters.map((center) => ({
    x: center - columnSize.width / 2,
    y: 308,
    ...columnSize,
  })),
  columnCenters,
  architrave: { x: 60, y: 246, width: 960, height: 62 },
  inscription: { x: 116, y: 263, width: 848, height: 37 },
  frieze: { x: 60, y: 162, width: 960, height: tileSize.height, tileWidth: tileSize.width },
  metope: { x: 44, y: 8, width: 68, height: 68 }, // Tile-local coordinates.
  cornice: { x: 36, y: 139, width: 1008, height: 23 },
  pediment,
  tympanum: innerTriangle.map(([x, y]) => [x + pediment.x, y + pediment.y]),
};

function svgViewport({ width, height }) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    overflow: "visible",
  };
}

function Stroke({ d, fill = "none", transform }) {
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
      transform={transform}
    />
  );
}

export function Steps(props) {
  return (
    <svg {...svgViewport(TEMPLE.steps)} {...props} aria-hidden="true">
      <Stroke
        fill={paper}
        d="M 28 0 H 1004 V 22 H 1018 V 44 H 1032 V 66 H 0 V 44 H 14 V 22 H 28 Z"
      />
      <Stroke d="M 28 22 H 1004" />
      <Stroke d="M 14 44 H 1018" />
    </svg>
  );
}

const volute = `
  M 36 23
  C 28 18 16 18 10 27
  C 4 36 8 46 16 49
  C 24 52 33 48 34 41
  C 35 34 31 29 26 29
  C 21 29 18 32 18 37
  C 18 40 21 42 24 41
`;

export function Column(props) {
  // The shaft was drawn from y 75 to 546; squash it to the chosen length, and move the base up.
  const end = 75 + shaft;
  const k = shaft / 471;
  const y = (v) => 75 + (v - 75) * k;
  const drop = end - 546;
  return (
    <svg {...svgViewport(columnArt)} {...props} aria-hidden="true">
      {/* Shaft, with the widest point a third of the way up. */}
      <Stroke
        fill={paper}
        d={`M 33 75 H 87
           C 89 ${y(182)} 92 ${y(312)} 92 ${y(387)} C 92 ${y(451)} 91 ${y(503)} 90 ${end}
           H 30
           C 29 ${y(503)} 28 ${y(451)} 28 ${y(387)} C 28 ${y(312)} 31 ${y(182)} 33 75 Z`}
      />
      {[-3, -2, -1, 0, 1, 2, 3].map((flute) => {
        const topX = 60 + flute * 6.75;
        const swellX = 60 + flute * 8;
        const baseX = 60 + flute * 7.5;

        return (
          <Stroke
            key={flute}
            d={`M ${topX} 86
                C ${topX} ${y(202)} ${swellX} ${y(313)} ${swellX} ${y(387)}
                C ${swellX} ${y(451)} ${baseX} ${y(488)} ${baseX} ${y(535)}`}
          />
        );
      })}

      {/* Torus, scotia, torus, and square plinth. */}
      <g transform={`translate(0 ${drop})`}>
      <Stroke
        fill={paper}
        d="M 30 545 H 90
           C 92 547 92 550 92 553 C 92 556 91 559 89 560
           C 85 562 84 567 88 570
           C 92 572 94 575 94 578 C 94 581 93 583 91 584
           H 102 V 596 H 18 V 584 H 29
           C 27 583 26 581 26 578 C 26 575 28 572 32 570
           C 36 567 35 562 31 560
           C 29 559 28 556 28 553 C 28 550 28 547 30 545 Z"
      />
      <Stroke d="M 31 560 H 89" />
      <Stroke d="M 32 570 H 88" />
      <Stroke d="M 29 584 H 91" />
      </g>

      {/* Abacus, volutes, and echinus. */}
      <Stroke
        fill={paper}
        d="M 0 0 H 120 V 10 H 114 V 15
           C 114 22 120 27 120 37 C 120 50 110 60 98 60 C 92 60 88 58 85 55
           C 87 61 86 67 83 71 H 87 V 77 H 33 V 71 H 37
           C 34 67 33 61 35 55
           C 32 58 28 60 22 60 C 10 60 0 50 0 37 C 0 27 6 22 6 15
           V 10 H 0 Z"
      />
      <Stroke d="M 6 10 H 114" />
      <Stroke d={volute} />
      <Stroke d={volute} transform="translate(120 0) scale(-1 1)" />
      <Stroke d="M 36 23 Q 60 31 84 23" />
      <Stroke d="M 35 55 Q 60 60 85 55" />
      {[42, 51, 60, 69, 78].map((x) => (
        <Stroke key={x} d={`M ${x - 2.5} 62 Q ${x} 71 ${x + 2.5} 62`} />
      ))}
      <Stroke d="M 37 71 H 83" />
    </svg>
  );
}

export function Architrave(props) {
  return (
    <svg {...svgViewport(TEMPLE.architrave)} {...props} aria-hidden="true">
      <Stroke fill={paper} d="M 0 0 H 960 V 62 H 0 Z" />
      <Stroke d="M 0 11 H 960" />
    </svg>
  );
}

const { x: metopeX, y: metopeY, width: metopeWidth, height: metopeHeight } = TEMPLE.metope;
const metopeOutline = `M ${metopeX} ${metopeY} h ${metopeWidth} v ${metopeHeight} h ${-metopeWidth} Z`;

export function FriezeTile(props) {
  return (
    <svg {...svgViewport(tileSize)} {...props} aria-hidden="true">
      {/* The fill has a transparent aperture, and both rails continue into the next tile. */}
      <path
        d={`M 0 0 H ${tileSize.width} V ${tileSize.height} H 0 Z ${metopeOutline}`}
        fill={paper}
        fillRule="evenodd"
        stroke="none"
        pathLength={1}
      />
      <Stroke d={`M 0 0 H ${tileSize.width}`} />
      <Stroke d={`M 0 ${tileSize.height} H ${tileSize.width}`} />
      {[12, 22, 32].map((x) => (
        <Stroke key={x} d={`M ${x} 12 V 72`} />
      ))}
      <Stroke d={metopeOutline} />
    </svg>
  );
}

export function Cornice(props) {
  return (
    <svg {...svgViewport(TEMPLE.cornice)} {...props} aria-hidden="true">
      <Stroke
        fill={paper}
        d="M 0 0 H 1008 V 8 H 1000
           C 997 8 995 10 994 13 L 990 23 H 18 L 14 13 C 13 10 11 8 8 8
           H 0 Z"
      />
      <Stroke d="M 8 8 H 1000" />
    </svg>
  );
}

export function Pediment(props) {
  const tympanumOutline = `M ${innerTriangle.map((point) => point.join(" ")).join(" L ")} Z`;

  return (
    <svg {...svgViewport(pediment)} {...props} aria-hidden="true">
      <Stroke fill={paper} d="M 0 115 L 498 0 L 996 115 Z" />
      <Stroke d={tympanumOutline} />
    </svg>
  );
}

export function TemplePreview(props) {
  const { steps, columns, architrave, frieze, cornice, pediment } = TEMPLE;
  const { x, y, width, height, tileWidth } = frieze;

  return (
    <svg
      {...svgViewport(TEMPLE)}
      viewBox={TEMPLE.viewBox}
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
      {...props}
      aria-hidden="true"
    >
      <Steps {...steps} />
      {columns.map((box) => (
        <Column key={box.x} {...box} />
      ))}
      <Architrave {...architrave} />
      {Array.from({ length: width / tileWidth }, (_, index) => (
        <FriezeTile key={index} x={x + index * tileWidth} y={y} />
      ))}
      <Stroke d={`M ${x} ${y} v ${height}`} />
      <Stroke d={`M ${x + width} ${y} v ${height}`} />
      <Cornice {...cornice} />
      <Pediment {...pediment} />
    </svg>
  );
}
