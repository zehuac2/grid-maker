import { FC, useId } from 'react';

import { useFormContext } from 'react-hook-form';

import { PAPERS } from './papers';
import { Inch, Pixel } from './units';

import styles from './Configuration.module.scss';

export interface ConfigurationProps {
  className?: string;
}

export interface ConfigurationValues {
  paperKey: string;
  cellSize: Inch;
  fontSize: Pixel;
}

const Configuration: FC<ConfigurationProps> = ({ className }) => {
  const { register } = useFormContext<ConfigurationValues>();
  const paperSizeId = useId();
  const cellSizeId = useId();
  const fontSizeId = useId();

  return (
    <div className={className}>
      <form className={styles.Configuration}>
        <label className={styles.Configuration_label} htmlFor={paperSizeId}>
          Paper Sizes
        </label>
        <select id={paperSizeId} {...register('paperKey')}>
          {Object.keys(PAPERS).map((paper) => (
            <option key={paper} value={paper}>
              {PAPERS[paper].displayName}
            </option>
          ))}
        </select>
        <label className={styles.Configuration_label} htmlFor={cellSizeId}>
          Cell Size (inch)
        </label>
        <input
          id={cellSizeId}
          placeholder="inch"
          type="number"
          step={0.1}
          {...register('cellSize')}
        />
        <label className={styles.Configuration_label} htmlFor={fontSizeId}>
          Font Size (px)
        </label>
        <input
          id={fontSizeId}
          placeholder="px"
          type="number"
          step={1}
          {...register('fontSize')}
        />
        <button
          className={styles.Configuration_button}
          onClick={(e) => {
            e.preventDefault();
            window.print();
          }}
        >
          Print
        </button>
      </form>
      <div>Info</div>
      <ul>
        <li>
          <a href={'https://github.com/Zehua-Chen/grid-maker'} target="_blank">
            Git
          </a>
        </li>
      </ul>
    </div>
  );
};

Configuration.displayName = 'Configuration';

export default Configuration;
