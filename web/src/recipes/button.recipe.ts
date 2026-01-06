import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'Styles for button component',
  base: {
    base: {
      all: 'unset',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2',
      px: '3.5',
      py: '3',
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
    },
  },
});
