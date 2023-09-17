import { FC, useId, useState } from 'react';
import Grid from './components/Grid';
import { PAPERS } from './papers';
import { inchToPixel, Inch } from './units';

const InvalidConfiguration: FC = () => {
  return <div>Please enter a valid setting</div>;
};

InvalidConfiguration.displayName = 'InvalidConfiguration';

const App: FC = () => {
  const [paperKey, setPaperKey] = useState('US_ENVELOPE_9');
  const paper = PAPERS[paperKey];
  const { width, height } = paper;

  const [cellSize, setCellSize] = useState(0.2 as Inch);

  const paperSizeId = useId();
  const cellSizeId = useId();

  return (
    <>
      <form className="HideOnPrint">
        <div>
          <label htmlFor={paperSizeId}>Paper Sizes</label>
          <select
            id={paperSizeId}
            value={paperKey}
            onChange={(e) => setPaperKey(e.target.value)}
          >
            {Object.keys(PAPERS).map((paper) => (
              <option key={paper} value={paper}>
                {PAPERS[paper].displayName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={cellSizeId}>Cell Size (inch)</label>
          <input
            placeholder="inch"
            type="number"
            value={cellSize}
            step={0.1}
            onChange={(e) =>
              setCellSize(Number.parseFloat(e.target.value) as Inch)
            }
          />
        </div>
      </form>
      {cellSize === 0 ? (
        <InvalidConfiguration />
      ) : (
        <Grid
          width={inchToPixel(width)}
          height={inchToPixel(height)}
          cellSize={inchToPixel(cellSize)}
          alt={`A grid whose width is ${width} inches, and whose height is ${height} inches`}
        ></Grid>
      )}
    </>
  );
};

App.displayName = 'App';

export default App;
