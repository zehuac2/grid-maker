import { FC, useId } from 'react';

import { useFormContext } from 'react-hook-form';
import Button from './components/Button';
import InputField from './components/InputField';
import { Papers } from './papers';
import { Inch, Pixel, isValidPixel } from './units';

import styles from './Configuration.module.scss';

export interface ConfigurationProps {
  className?: string;
}

export interface ConfigurationValues {
  paperKey: string;
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

const Configuration: FC<ConfigurationProps> = ({ className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ConfigurationValues>();
  const paperSizeId = useId();

  return (
    <div className={className}>
      <form className={styles.Configuration}>
        <label className={styles.Configuration_label} htmlFor={paperSizeId}>
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
          labelClassName={styles.Configuration_label}
          labelText="Cell Size (inch)"
          inputClassName={styles.Configuration_input}
          errorMessageClassName={styles.Configuration_errorMessage}
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
          labelClassName={styles.Configuration_label}
          labelText="Font Size (px)"
          inputClassName={styles.Configuration_input}
          errorMessageClassName={styles.Configuration_errorMessage}
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
          className={styles.Configuration_button}
          onClick={(e) => {
            e.preventDefault();
            window.print();
          }}
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
