import { FC, useId } from 'react';

import { useFormContext } from 'react-hook-form';
import Button from './components/Button';
import InputField from './components/InputField';
import { Papers } from './papers';
import { Inch, Pixel, isValidPixel } from './units';

import { css, cx } from 'styled-system/css';

export interface ConfigurationProps {
  className?: string;
  onSubmit: (values: ConfigurationValues) => void;
}

export interface ConfigurationValues {
  paperKey: keyof typeof Papers;
  cellSize: Inch;
  fontSize: Pixel;
}

function validateNotInfinite(value: number): boolean {
  return value !== Infinity && value !== -Infinity;
}

function validateInch(inch: number): boolean {
  return isValidPixel(inch as Inch) && validateNotInfinite(inch);
}

function validatePixel(pixel: number): boolean {
  return !isNaN(pixel) && validateNotInfinite(pixel);
}

const Configuration: FC<ConfigurationProps> = ({ className, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<ConfigurationValues>();
  const paperSizeId = useId();

  const controlClassName = css({
    width: '100%',
    minWidth: 0,
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--gm-border)',
    background: 'var(--gm-bg-1)',
    color: 'var(--gm-text)',
    outline: 'none',
    '&:focus': {
      borderColor: 'rgba(2, 132, 199, 0.65)',
      boxShadow: '0 0 0 3px rgba(2, 132, 199, 0.2)',
    },
  });

  const labelClassName = css({
    textAlign: 'left',
    gridColumn: 1,
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--gm-text)',
    '@media (min-width: 640px)': {
      textAlign: 'right',
    },
  });

  const errorMessageClassName = css({
    gridColumn: 1,
    color: '#b91c1c',
    margin: 0,
    fontSize: '12px',
    '@media (min-width: 640px)': {
      gridColumn: 2,
    },
  });

  return (
    <div
      className={cx(
        css({
          background: 'var(--gm-card)',
          border: '1px solid var(--gm-border)',
          borderRadius: 'var(--gm-radius)',
          boxShadow: 'var(--gm-shadow)',
          padding: '20px',
        }),
        className
      )}
    >
      <div className={css({ fontSize: '16px', fontWeight: 650 })}>Settings</div>
      <div className={css({ fontSize: '13px', color: 'var(--gm-muted)', marginTop: '4px' })}>
        Customize your grid
      </div>

      <form
        className={css({
          marginTop: '16px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center',
          gap: '10px',
          '@media (min-width: 640px)': {
            gridTemplateColumns: '140px 1fr',
            gap: '12px',
          },
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={labelClassName} htmlFor={paperSizeId}>
          Paper Size
        </label>
        <select id={paperSizeId} className={controlClassName} {...register('paperKey')}>
          {Object.keys(Papers).map((paper) => (
            <option key={paper} value={paper}>
              {Papers[paper].displayName}
            </option>
          ))}
        </select>

        <InputField
          labelClassName={labelClassName}
          labelText="Cell Size (inch)"
          inputClassName={controlClassName}
          errorMessageClassName={errorMessageClassName}
          errorMessage={errors.cellSize?.message}
          type="number"
          step={0.1}
          {...register('cellSize', {
            valueAsNumber: true,
            validate: validateInch,
            required: 'Cell size is required',
            min: {
              value: 0.1,
              message: 'Cell size must be greater than 0.1 inch',
            },
          })}
        />

        <InputField
          labelClassName={labelClassName}
          labelText="Font Size (px)"
          inputClassName={controlClassName}
          errorMessageClassName={errorMessageClassName}
          errorMessage={errors.fontSize?.message}
          type="number"
          step={1}
          {...register('fontSize', {
            valueAsNumber: true,
            validate: validatePixel,
            required: 'Font size is required',
            min: {
              value: 1,
              message: 'Font size must be at least 1',
            },
          })}
        />

        <Button className={css({ gridColumn: '1 / -1', marginTop: '4px' })} type="submit">
          Print Grid
        </Button>
      </form>

      <div
        className={css({
          marginTop: '16px',
          padding: '14px',
          borderRadius: 'var(--gm-radius)',
          border: '1px solid var(--gm-border)',
          background: 'var(--gm-bg-1)',
          color: 'var(--gm-muted)',
          fontSize: '13px',
        })}
      >
        Create custom printable grids for various paper sizes.
        <div className={css({ marginTop: '8px' })}>
          <a
            className={css({
              color: 'inherit',
              fontWeight: 600,
              textDecoration: 'none',
              _hover: { textDecoration: 'underline', color: 'var(--gm-text)' },
            })}
            href={'https://github.com/Zehua-Chen/grid-maker'}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

Configuration.displayName = 'Configuration';

export default Configuration;
