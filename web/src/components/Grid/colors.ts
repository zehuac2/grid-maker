import { token, type Token } from 'styled-system/tokens';

function getVariable(t: Token): string {
  return token(t).replaceAll('var(', '').replaceAll(')', '');
}

export function getGridTextVariable(): string {
  return getVariable('colors.grid.text');
}

export function getGridLineVariable(): string {
  return getVariable('colors.grid.line');
}

export function getGridFontVariable(): string {
  return getVariable('fonts.grid');
}
