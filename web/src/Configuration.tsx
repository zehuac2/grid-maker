import { FC, useId } from 'react';

import { useFormContext } from 'react-hook-form';
import InputField from './components/InputField';
import { Papers } from './papers';
import { Inch, Pixel, isValidPixel } from './units';
import { REPO_URL } from '@/meta';

import { css, cx } from 'styled-system/css';
import { button, card } from 'styled-system/recipes';

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
    width: '[100%]',
    minWidth: '0',
    padding: '[10px 12px]',
    borderRadius: 'control',
    borderWidth: '[1px]',
    borderStyle: 'solid',
    borderColor: 'border.default',
    bg: 'bg.canvas',
    color: 'fg.default',
    outline: 'none',
    '&:focus': {
      borderColor: 'focus.border',
      boxShadow: 'focus',
    },
  });

  const labelClassName = css({
    textAlign: 'left',
    gridColumn: 1,
    fontSize: '[13px]',
    fontWeight: 'semibold',
    color: 'fg.default',
    '@media (min-width: 640px)': {
      textAlign: 'right',
    },
  });

  const errorMessageClassName = css({
    gridColumn: 1,
    color: 'danger.fg',
    margin: '0',
    fontSize: '[12px]',
    '@media (min-width: 640px)': {
      gridColumn: 2,
    },
  });

  return (
    <div className={cx(card(), className)}>
      <div className={css({ fontSize: '[16px]', fontWeight: 'ui' })}>
        Settings
      </div>
      <div
        className={css({
          fontSize: '[13px]',
          color: 'fg.muted',
          marginTop: '[4px]',
        })}
      >
        Customize your grid
      </div>

      <form
        className={css({
          marginTop: '[16px]',
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center',
          gap: '[10px]',
          '@media (min-width: 640px)': {
            gridTemplateColumns: '140px 1fr',
            gap: '[12px]',
          },
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={labelClassName} htmlFor={paperSizeId}>
          Paper Size
        </label>
        <select
          id={paperSizeId}
          className={controlClassName}
          {...register('paperKey')}
        >
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

        <button
          className={cx(
            button(),
            css({ gridColumn: '1 / -1', marginTop: '[4px]' })
          )}
          type="submit"
        >
          Print Grid
        </button>
      </form>

      <div
        className={css({
          marginTop: '[16px]',
          padding: '[14px]',
          borderRadius: 'card',
          borderWidth: '[1px]',
          borderStyle: 'solid',
          borderColor: 'border.default',
          bg: 'bg.canvas',
          color: 'fg.muted',
          fontSize: '[13px]',
        })}
      >
        Create custom printable grids for various paper sizes.
        <div className={css({ marginTop: '[8px]' })}>
          <a
            className={css({
              fontWeight: 'semibold',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline', color: 'fg.default' },
            })}
            href={REPO_URL}
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
