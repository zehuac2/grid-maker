import { FC, PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

export interface ButtonProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'button'> {}

const Button: FC<ButtonProps> = ({ className, children, ...others }) => (
  <button className={clsx(styles.Button, className)} {...others}>
    {children}
  </button>
);

Button.displayName = 'Button';

export default Button;
