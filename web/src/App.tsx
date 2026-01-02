import { FC, useDeferredValue } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Grid from './components/Grid';
import Configuration, { ConfigurationValues } from './Configuration';
import { Papers } from './papers';
import { inchToPixel } from './units';
import recordPrint from '@/analytics/events/recordPrint';

import { css } from 'styled-system/css';

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
      <div className={css({})}>
        <nav
          className={css({
            position: 'sticky',
            top: 0,
            padding: '20px 0',
            background: 'white',
            borderBottom: 'solid 1px gray',
            _print: { display: 'none' },
          })}
        >
          <div
            className={css({
              width: '100%',
              padding: '0 10px',
              '@media screen and (min-width: 1441px)': {
                maxWidth: '1440px',
                marginLeft: 'auto',
                marginRight: 'auto',
              },
            })}
          >
            Grid Maker
          </div>
        </nav>
        <div
          className={css({
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            '@media not print': {
              paddingTop: '20px',
            },
            '@media screen, not print and (min-width: 1441px)': {
              maxWidth: '1440px',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          })}
        >
          <div
            className={css({
              '@media not print': {
                flex: '0 1 auto',
                padding: '10px',
                overflow: 'auto',
              },
            })}
          >
            <Grid
              width={deferredWidth}
              height={deferredHeight}
              cellSize={deferredCellSize}
              fontSize={deferredFontSize}
              alt={`A grid whose width is ${width} inches, and whose height is ${height} inches`}
            ></Grid>
          </div>

          <Configuration
            className={css({
              flex: 'auto 1 1',
              padding: '10px',
              _print: { display: 'none' },
            })}
            onSubmit={(values) => {
              recordPrint({
                paper: Papers[values.paperKey],
                cellSize: values.cellSize,
                cellUnit: 'inch',
                fontSize: values.fontSize,
                fontUnit: 'pixel',
              });

              window.print();
            }}
          />
        </div>
      </div>
    </FormProvider>
  );
};

App.displayName = 'App';

export default App;
