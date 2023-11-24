import { FC, useRef, useEffect, useState } from 'react';

import { Pixel } from '../../units';

import styles from './Grid.module.scss';

export interface GridProps {
  className?: string;

  cellSize: Pixel;
  width: Pixel;
  height: Pixel;
  alt?: string;
}

function drawGridLines(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  cellSize: number,
  lineWidth: number
): void {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = lineWidth;

  for (let x = cellSize; x < width; x += cellSize) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }

  for (let y = cellSize; y < height; y += cellSize) {
    context.moveTo(0, y);
    context.lineTo(width, y);
  }

  context.stroke();
}

function drawGridTexts(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  cellSize: number
): void {
  context.fillStyle = 'black';
  context.font = '12px san-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const xCellCount = Math.ceil(width / cellSize);
  const yCellCount = Math.ceil(height / cellSize);

  const textOffset = Math.floor(cellSize / 2);

  for (let x = 0; x < xCellCount; x++) {
    for (let y = 0; y < yCellCount; y++) {
      const xTextOffset = textOffset + x * cellSize;
      const yTextOffset = textOffset + y * cellSize;

      context.fillText(`${x},${y}`, xTextOffset, yTextOffset, cellSize);
    }
  }
}

const Grid: FC<GridProps> = ({ className, cellSize, width, height, alt }) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [renderResult, setRenderResult] = useState('');
  const canvasWidth = Math.floor(width);
  const canvasHeight = Math.floor(height);
  const canvasCellSize = Math.floor(cellSize);
  const dpr = window.devicePixelRatio;
  const renderWidth = canvasWidth * dpr;
  const renderHeight = canvasHeight * dpr;
  const renderCellSize = canvasCellSize * dpr;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext('2d');
    const lineWidth = dpr;

    context.clearRect(0, 0, renderWidth, renderHeight);

    context.fillStyle = 'lightgray';
    context.fillRect(0, 0, renderWidth, renderHeight);

    drawGridLines(
      context,
      renderWidth,
      renderHeight,
      renderCellSize,
      lineWidth
    );

    drawGridTexts(context, renderWidth, renderHeight, renderCellSize);

    context.scale(1 / dpr, 1 / dpr);

    setRenderResult(canvasRef.current.toDataURL());

    return () => {
      context.clearRect(0, 0, renderWidth, renderHeight);
      context.scale(dpr, dpr);
    };
  }, [renderWidth, renderHeight, renderCellSize, dpr]);

  return (
    <>
      {/*
      Canvas' 2d drawing context operates in a device pixel ratio that is
      independent of the device pixel ratio of the viewport. Therefore, we
      must render the grid into a size that is visually suitable for display,
      and then scale it down to the actual size.
      */}
      <canvas
        className={styles.GridCanvas}
        ref={canvasRef}
        width={renderWidth}
        height={renderHeight}
      ></canvas>
      <img
        className={className}
        width={canvasWidth}
        height={canvasHeight}
        src={renderResult}
      />
    </>
  );
};

Grid.displayName = 'Grid';

export default Grid;
