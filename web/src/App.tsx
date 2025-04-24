import { FC, useDeferredValue } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Grid from './components/Grid';
import Configuration, { ConfigurationValues } from './Configuration';
import { Papers } from './papers';
import { inchToPixel } from './units';

import styles from './App.module.scss';

const App: FC = () => {
  const form = useForm<ConfigurationValues>({
    mode: 'onChange',
    defaultValues: { cellSize: 0.2, paperKey: 'US_ENVELOPE_9', fontSize: 6 },
  });
  const { watch } = form;

  const paper = Papers[watch('paperKey')];
  const { width, height } = paper;

  const deferredWidth = useDeferredValue(inchToPixel(width));
  const deferredHeight = useDeferredValue(inchToPixel(height));
  const deferredCellSize = useDeferredValue(inchToPixel(watch('cellSize')));
  const deferredFontSize = useDeferredValue(watch('fontSize'));

  return (
    <FormProvider {...form}>
      <div className={styles.App}>
        <nav className={styles.App_nav}>
          <div className={styles.App_nav_content}>Grid Maker</div>
        </nav>
        <div className={styles.App_content}>
          <div className={styles.App_content_grid}>
            <Grid
              width={deferredWidth}
              height={deferredHeight}
              cellSize={deferredCellSize}
              fontSize={deferredFontSize}
              alt={`A grid whose width is ${width} inches, and whose height is ${height} inches`}
            ></Grid>
          </div>

          <Configuration className={styles.App_content_configuration} />
        </div>
      </div>
    </FormProvider>
  );
};

App.displayName = 'App';

export default App;
