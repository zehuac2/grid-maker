interface CellProps {
  size: number;
  x: number;
  y: number;
  text: string;
}

export default function Cell({ size, x, y, text }: CellProps): JSX.Element {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill="white"
        strokeWidth={0.5}
        stroke="black"
      ></rect>
      <text
        x={x + size / 2}
        y={y + size / 2}
        fill="black"
        fontSize={5}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {text}
      </text>
    </g>
  );
}

Cell.displayName = 'Cell';
