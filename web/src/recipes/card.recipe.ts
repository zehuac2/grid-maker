import { defineRecipe } from '@pandacss/dev';

export const cardRecipe = defineRecipe({
  className: 'card',
  description: 'Styles for card component',
  base: {
    bg: 'surface.card',
    borderWidth: '[1px]',
    borderStyle: 'solid',
    borderColor: 'border.default',
    borderRadius: 'card',
    boxShadow: 'card',
    padding: '[20px]',
  },
});
