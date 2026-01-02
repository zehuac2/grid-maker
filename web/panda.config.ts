import { defineConfig } from '@pandacss/dev';
import { buttonRecipe } from './src/recipes/button.recipe';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  strictTokens: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Generates JSX utilities with options of React, Preact, Qwik, Solid, Vue
  jsxFramework: 'react',

  cssVarRoot: ':where(:root, :host)',

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          white: { value: '#ffffff' },
          baseBg: {
            1: { value: '#f8fafc', description: 'Page background (light)' },
            2: {
              value: '#f1f5f9',
              description: 'Page background subtle (light)',
            },
          },
          baseSurface: {
            card: { value: '#ffffff', description: 'Card/background surface' },
            glass: {
              value: 'rgba(255, 255, 255, 0.8)',
              description: 'Translucent surface for sticky header',
            },
          },
          baseFg: {
            1: { value: '#0f172a', description: 'Primary text' },
            2: { value: '#64748b', description: 'Muted text' },
            onBrand: {
              value: '#ffffff',
              description: 'Text on brand surfaces',
            },
          },
          baseBorder: {
            subtle: {
              value: 'rgba(15, 23, 42, 0.12)',
              description: 'Subtle border',
            },
            strong: {
              value: 'rgba(15, 23, 42, 0.18)',
              description: 'Stronger border (e.g. canvas preview)',
            },
          },
          baseBrand: {
            solid: {
              value: '#0f172a',
              description: 'Primary action background',
            },
            hover: {
              value: '#111827',
              description: 'Primary action hover background',
            },
          },
          baseFocus: {
            border: {
              value: 'rgba(2, 132, 199, 0.65)',
              description: 'Focus border color',
            },
            ring: {
              value: 'rgba(2, 132, 199, 0.2)',
              description: 'Focus ring color',
            },
          },
          baseDanger: {
            fg: { value: '#b91c1c', description: 'Error text color' },
          },
        },
        radii: {
          card: { value: '10px', description: 'Card radius' },
          control: { value: '8px', description: 'Form control radius' },
          inner: { value: '8px', description: 'Inner container radius' },
        },
        shadows: {
          card: {
            value: '0 12px 30px rgba(15, 23, 42, 0.08)',
            description: 'Card shadow',
          },
          subtle: {
            value: '0 1px 3px rgba(15, 23, 42, 0.08)',
            description: 'Subtle shadow',
          },
          focus: {
            value: '0 0 0 3px rgba(2, 132, 199, 0.2)',
            description: 'Focus ring shadow',
          },
        },
        fontWeights: {
          ui: { value: '650', description: 'UI semibold (650)' },
        },
        fonts: {
          body: {
            value:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            description: 'Default UI font stack',
          },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: { value: '{colors.baseBg.1}' },
            subtle: { value: '{colors.baseBg.2}' },
          },
          surface: {
            card: { value: '{colors.baseSurface.card}' },
            glass: { value: '{colors.baseSurface.glass}' },
          },
          fg: {
            default: { value: '{colors.baseFg.1}' },
            muted: { value: '{colors.baseFg.2}' },
            onBrand: { value: '{colors.baseFg.onBrand}' },
          },
          border: {
            default: { value: '{colors.baseBorder.subtle}' },
            strong: { value: '{colors.baseBorder.strong}' },
          },
          brand: {
            solid: { value: '{colors.baseBrand.solid}' },
            hover: { value: '{colors.baseBrand.hover}' },
          },
          focus: {
            border: { value: '{colors.baseFocus.border}' },
          },
          danger: {
            fg: { value: '{colors.baseDanger.fg}' },
          },
        },
      },
      recipes: {
        button: buttonRecipe,
      },
    },
  },

  globalCss: {
    'html, body': {
      fontFamily: 'body',
      color: 'fg.default',
      bg: 'bg.canvas',
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
