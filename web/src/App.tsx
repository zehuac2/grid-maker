import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Grid from './components/Grid';
import InvalidConfiguration from './components/InvalidConfiguration';
import Configuration, { ConfigurationValues } from './Configuration';
import { PAPERS } from './papers';
import { inchToPixel } from './units';

import * as styles from './App.module.scss';

const App: FC = () => {
  const form = useForm<ConfigurationValues>({
    mode: 'onChange',
    defaultValues: { cellSize: 0.2, paperKey: 'US_ENVELOPE_9', fontSize: 6 },
  });
  const {
    watch,
    formState: { errors },
  } = form;

  const paper = PAPERS[watch('paperKey')];
  const cellSize = watch('cellSize');
  const { width, height } = paper;

  return (
    <FormProvider {...form}>
      <div className={styles.App}>
        <nav className={styles.App_nav}>
          <div className={styles.App_nav_content}>Grid Maker</div>
        </nav>
        <div className={styles.App_content}>
          <div className={styles.App_content_grid}>
            {Object.keys(errors).length > 0 ? (
              <InvalidConfiguration />
            ) : (
              <Grid
                width={inchToPixel(width)}
                height={inchToPixel(height)}
                cellSize={inchToPixel(cellSize)}
                fontSize={watch('fontSize')}
                alt={`A grid whose width is ${width} inches, and whose height is ${height} inches`}
              ></Grid>
            )}
          </div>

          <Configuration className={styles.App_content_configuration} />
        </div>
      </div>
    </FormProvider>
  );
};

App.displayName = 'App';

export default App;
