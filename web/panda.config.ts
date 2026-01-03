import { defineConfig } from '@pandacss/dev';
import { buttonRecipe } from './src/recipes/button.recipe';
import { cardRecipe } from './src/recipes/card.recipe';

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
          white: {
            DEFAULT: { value: '#ffffff' },
            a1: { value: 'rgba(255, 255, 255, 0.8)' },
          },
          gray: {
            1: { value: '#f8fafc' },
            2: { value: '#f1f5f9' },
            3: { value: '#64748b' },
            4: { value: '#0f172a' },
            5: { value: '#111827' },
            a1: { value: 'rgba(15, 23, 42, 0.12)' },
            a2: { value: 'rgba(15, 23, 42, 0.18)' },
          },
          blue: {
            a1: { value: 'rgba(2, 132, 199, 0.65)' },
            a2: { value: 'rgba(2, 132, 199, 0.2)' },
          },
          red: {
            1: { value: '#b91c1c' },
          },
        },
        radii: {
          sm: { value: '8px' },
          md: { value: '10px' },
        },
        fontWeights: {
          demibold: { value: '650' },
        },
        fonts: {
          sans: {
            value:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: {
              value: '{colors.gray.1}',
              description: 'Page background (light)',
            },
            subtle: {
              value: '{colors.gray.2}',
              description: 'Page background subtle (light)',
            },
          },
          surface: {
            card: {
              value: '{colors.white}',
              description: 'Card/background surface',
            },
            glass: {
              value: '{colors.white.a1}',
              description: 'Translucent surface for sticky header',
            },
          },
          fg: {
            default: { value: '{colors.gray.4}', description: 'Primary text' },
            muted: { value: '{colors.gray.3}', description: 'Muted text' },
            onBrand: {
              value: '{colors.white}',
              description: 'Text on brand surfaces',
            },
          },
          border: {
            default: {
              value: '{colors.gray.a1}',
              description: 'Subtle border',
            },
            strong: {
              value: '{colors.gray.a2}',
              description: 'Stronger border (e.g. canvas preview)',
            },
          },
          brand: {
            solid: {
              value: '{colors.gray.4}',
              description: 'Primary action background',
            },
            hover: {
              value: '{colors.gray.5}',
              description: 'Primary action hover background',
            },
          },
          focus: {
            border: {
              value: '{colors.blue.a1}',
              description: 'Focus border color',
            },
          },
          danger: {
            fg: { value: '{colors.red.1}', description: 'Error text color' },
          },
        },
        radii: {
          card: { value: '{radii.md}', description: 'Card radius' },
          control: { value: '{radii.sm}', description: 'Form control radius' },
          inner: { value: '{radii.sm}', description: 'Inner container radius' },
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
            value: '0 0 0 3px {colors.blue.a2}',
            description: 'Focus ring shadow',
          },
        },
        fontWeights: {
          ui: {
            value: '{fontWeights.demibold}',
            description: 'UI semibold (650)',
          },
        },
        fonts: {
          body: {
            value: '{fonts.sans}',
            description: 'Default UI font stack',
          },
        },
      },
      recipes: {
        button: buttonRecipe,
        card: cardRecipe,
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
