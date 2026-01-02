import { FC, useId } from 'react';

import { useFormContext } from 'react-hook-form';
import Button from './components/Button';
import InputField from './components/InputField';
import { Papers } from './papers';
import { Inch, Pixel, isValidPixel } from './units';

import { css } from 'styled-system/css';

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

  return (
    <div className={className}>
      <form
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(2, auto)',
          justifyContent: 'left',
          gap: '10px',
        })}
      >
        <label
          className={css({ textAlign: 'right', gridColumn: 1 })}
          htmlFor={paperSizeId}
        >
          Paper Sizes
        </label>
        <select id={paperSizeId} {...register('paperKey')}>
          {Object.keys(Papers).map((paper) => (
            <option key={paper} value={paper}>
              {Papers[paper].displayName}
            </option>
          ))}
        </select>
        <InputField
          labelClassName={css({ textAlign: 'right', gridColumn: 1 })}
          labelText="Cell Size (inch)"
          inputClassName={css({})}
          errorMessageClassName={css({
            gridColumn: 2,
            color: 'red',
            margin: 0,
          })}
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
          labelClassName={css({ textAlign: 'right', gridColumn: 1 })}
          labelText="Font Size (px)"
          inputClassName={css({})}
          errorMessageClassName={css({
            gridColumn: 2,
            color: 'red',
            margin: 0,
          })}
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
        <Button
          className={css({ gridColumn: '1 / span 2' })}
          onClick={handleSubmit(onSubmit)}
        >
          Print
        </Button>
      </form>
      <div>Info</div>
      <ul>
        <li>
          <a href={'https://github.com/Zehua-Chen/grid-maker'} target="_blank">
            Github
          </a>
        </li>
      </ul>
    </div>
  );
};

Configuration.displayName = 'Configuration';

export default Configuration;
