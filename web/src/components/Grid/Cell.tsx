import { FC } from 'react';

interface CellProps {
  size: number;
  x: number;
  y: number;
  text: string;
}

const Cell: FC<CellProps> = ({ size, x, y, text }) => {
  return (
    <g>
      <rect
        className="Grid_cell_rect"
        x={x}
        y={y}
        width={size}
        height={size}
      ></rect>
      <text className="Grid_cell_text" x={x + size / 2} y={y + size / 2}>
        {text}
      </text>
    </g>
  );
};

Cell.displayName = 'Cell';

export default Cell;
