import Grid from './components/Grid';
import { PAPERS } from './papers';
import { inchToPixel, Inch } from './units';

export default function App() {
  const { width, height } = PAPERS.US_ENVELOPE_9;
  const cellSize = inchToPixel(0.2 as Inch);

  return (
    <>
      <Grid
        width={inchToPixel(width)}
        height={inchToPixel(height)}
        cellSize={cellSize}
        alt={`A grid whose width is ${width} inches, and whose height is ${height} inches`}
      ></Grid>
    </>
  );
}

App.displayName = 'App';
