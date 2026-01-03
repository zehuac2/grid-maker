import { FC, useDeferredValue } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Grid from './components/Grid';
import Configuration, { ConfigurationValues } from './Configuration';
import { Papers } from './papers';
import { inchToPixel } from './units';
import recordPrint from '@/analytics/events/recordPrint';
import { REPO_URL } from '@/meta';

import { css } from 'styled-system/css';
import { card } from 'styled-system/recipes';

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

  const colCount =
    deferredCellSize > 0 ? Math.floor(deferredWidth / deferredCellSize) : 0;
  const rowCount =
    deferredCellSize > 0 ? Math.floor(deferredHeight / deferredCellSize) : 0;

  return (
    <FormProvider {...form}>
      <div
        className={css({
          minHeight: { base: '[100vh]', _print: 'auto' },
          backgroundImage: {
            base: 'linear-gradient(135deg, var(--colors-bg-canvas), var(--colors-bg-subtle))',
            _print: 'none',
          },
        })}
      >
        <header
          className={css({
            position: 'sticky',
            top: '0',
            zIndex: '[10]',
            borderBottomWidth: '[1px]',
            borderBottomStyle: 'solid',
            borderBottomColor: 'border.default',
            bg: 'surface.glass',
            backdropFilter: '[blur(10px)]',
            display: { _print: 'none' },
          })}
        >
          <div
            className={css({
              maxWidth: '[1200px]',
              margin: '[0 auto]',
              padding: { base: '[16px 24px]', xsDown: '[12px 16px]' },
              display: 'flex',
              flexWrap: 'wrap',
              minWidth: '0',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '[16px]',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '[12px]',
              })}
            >
              <div
                className={css({
                  width: '[36px]',
                  height: '[36px]',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'card',
                  bg: 'brand.solid',
                  color: 'fg.onBrand',
                  fontWeight: 'bold',
                  lineHeight: '[1]',
                })}
                aria-hidden
              >
                ▦
              </div>
              <h1
                className={css({
                  margin: '0',
                  fontSize: '[20px]',
                  fontWeight: 'ui',
                })}
              >
                Grid Maker
              </h1>
            </div>

            <a
              className={css({
                color: 'fg.muted',
                textDecoration: 'none',
                fontSize: '[14px]',
                fontWeight: 'medium',
                _hover: {
                  color: 'fg.default',
                  textDecoration: 'underline',
                },
              })}
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </header>

        <main
          className={css({
            maxWidth: '[1200px]',
            margin: '[0 auto]',
            padding: {
              base: '[32px 24px]',
              xsDown: '[20px 16px]',
              _print: '0',
            },
          })}
        >
          <div
            className={css({
              display: { base: 'grid', _print: 'block' },
              gap: '[24px]',
              gridTemplateColumns: {
                base: 'auto',
                lg: '[1fr 370px]',
              },
              alignItems: {
                lg: 'stretch',
              },
            })}
          >
            <section className={card()}>
              <div
                className={css({
                  padding: '[16px 20px]',
                  borderBottomWidth: '[1px]',
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'border.default',
                  display: { _print: 'none' },
                })}
              >
                <div className={css({ fontSize: '[16px]', fontWeight: 'ui' })}>
                  Preview
                </div>
                <div
                  className={css({
                    fontSize: '[13px]',
                    color: 'fg.muted',
                    marginTop: '[4px]',
                  })}
                >
                  {colCount} × {rowCount} grid ({width}" × {height}")
                </div>
              </div>

              <div
                className={css({
                  padding: { base: '[16px]', _print: '0' },
                })}
              >
                <div
                  className={css({
                    overflow: { base: 'auto', _print: 'visible' },
                    bg: 'white',
                    borderWidth: { base: '[1px]', _print: '0' },
                    borderStyle: { base: 'solid', _print: 'none' },
                    borderColor: 'border.default',
                    borderRadius: { base: 'inner', _print: '[0]' },
                    padding: { base: '[16px]', _print: '0' },
                  })}
                >
                  <Grid
                    className={css({
                      display: 'block',
                      margin: '[0 auto]',
                      bg: 'white',
                      borderWidth: { base: '[1px]', _print: '0' },
                      borderStyle: { base: 'solid', _print: 'none' },
                      borderColor: 'border.strong',
                      boxShadow: { base: 'subtle', _print: '[none]' },
                    })}
                    width={deferredWidth}
                    height={deferredHeight}
                    cellSize={deferredCellSize}
                    fontSize={deferredFontSize}
                    alt={`A grid whose width is ${width} inches, and whose height is ${height} inches`}
                  />
                </div>
              </div>
            </section>

            <Configuration
              className={css({
                display: { _print: 'none' },
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
        </main>
      </div>
    </FormProvider>
  );
};

App.displayName = 'App';

export default App;
