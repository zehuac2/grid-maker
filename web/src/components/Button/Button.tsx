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
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '[8px]',
        padding: '[12px 14px]',
        borderRadius: 'card',
        bg: 'brand.solid',
        color: 'fg.onBrand',
        fontWeight: 'ui',
        cursor: 'pointer',
        pointerEvents: 'auto',
        transition: '[transform 120ms ease, background-color 120ms ease]',
        _hover: {
          bg: 'brand.hover',
        },
        _active: {
          transform: '[translateY(1px)]',
        },
        '& *': {
          pointerEvents: 'none',
        },
        '&:disabled': {
          opacity: 0.6,
          cursor: 'not-allowed',
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
