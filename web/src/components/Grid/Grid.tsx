import { useMemo } from 'react';

import Cell from './Cell';

import { Pixel } from '../../units';

interface RawCell {
  id: any;
  x: number;
  y: number;
}

function makeGrid(width: number, height: number, cellSize: number): RawCell[] {
  const horizontalCellCount = Math.ceil(width / cellSize);
  const verticalCellCount = Math.ceil(height / cellSize);

  const cells: RawCell[] = [];
  let id = 0;

  for (let x = 0; x < horizontalCellCount; x++) {
    for (let y = 0; y < verticalCellCount; y++) {
      cells.push({ x, y, id: id++ });
    }
  }

  return cells;
}

export interface GridProps {
  cellSize: Pixel;
  width: Pixel;
  height: Pixel;
  alt?: string;
}

export default function Grid({ cellSize, width, height, alt }: GridProps) {
  const cells = useMemo(
    () => makeGrid(width, height, cellSize),
    [width, height, cellSize]
  );

  return (
    <svg width={width} height={height}>
      {alt ? <title>{alt}</title> : null}
      <rect width={width} height={height} fill="lightgray"></rect>
      {cells.map(({ x, y, id }) => {
        return (
          <Cell
            key={id}
            x={x * cellSize}
            y={y * cellSize}
            size={cellSize}
            text={`${x},${y}`}
          />
        );
      })}
    </svg>
  );
}

Grid.displayName = 'Grid';
