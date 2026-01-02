import { FC, PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import { css, cx } from 'styled-system/css';

export interface ButtonProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'button'> {}

const Button: FC<ButtonProps> = ({ className, children, ...others }) => (
  <button
    className={cx(
      css({
        all: 'unset',
        padding: '10px',
        textAlign: 'center',
        border: 'solid 1px gray',
        cursor: 'pointer',
        pointerEvents: 'auto',
        '& *': {
          pointerEvents: 'none',
        },
      }),
      className
    )}
    {...others}
  >
    {children}
  </button>
);

Button.displayName = 'Button';

export default Button;