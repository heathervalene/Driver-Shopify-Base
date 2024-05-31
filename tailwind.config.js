/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{liquid,js}"],
  safelist: [
    'col-start-1',
    'col-start-2',
    'col-start-3',
    'row-start-1',
    'row-start-2',
    'row-start-3',
    'row-start-4',
    'row-start-5',
    'row-start-6',
    'md:col-start-1',
    'md:col-start-2',
    'md:col-start-3',
    'md:row-start-1',
    'md:row-start-2',
    'md:row-start-3',
    'md:row-start-4',
    'md:row-start-5',
    'md:row-start-6',
    'xxl:col-start-1',
    'xxl:col-start-2',
    'xxl:col-start-3',
    'xxl:col-start-4',
    'xxl:row-start-1',
    'xxl:row-start-2',
    'xxl:row-start-3',
    'xxl:row-start-4',
    'xxl:row-start-5',
    'xxl:row-start-6',
    'flex',
    'flex-col',
    'lg:flex-row', 
    'items-center', 
    'lg:gap-3',
    'aspect-[5/7]',
    'sm:justify-start',
    'sm:justify-end',
    'sm:justify-center',
    'pt-8',
    'pb-4',
    '!opacity-80',
  ],
  /* These are required for Prestige to work */
  blocklist: [
    'container',
    'contents',
    'md:hidden',
  ],
  theme: {
    /* Custom fonts 'sans': ['Josefin Sans', 'ui-sans-serif'], */
    fontFamily: {
      'sans': ['Avenir Next', 'ui-sans-serif'],
      'serif': ['orpheuspro', 'ui-serif'],
      'mono': ['ui-monospace'],
      'display': ['orpheuspro', 'ui-serif'],
      'body': ['Avenir Next', 'ui-sans-serif'],
    },
    fontSize: {
      xxs: ['0.625rem', '1rem'],
      xs: ['0.75rem', '1rem'],
      navm: ['0.875rem', '1.25rem'],
      sm: ['0.875rem', '1.1875rem'],
      base: ['0.9375rem', '1.1875rem'],
      xl: ['1.375rem', '2rem'],
      '2xl': ['1.5rem', '2.25rem'],
      'h3m': ['1.75rem', '2.1875rem'],
      'h2m': ['2.25rem', '2.75rem'],
      'h1m': ['3rem', '3.2rem'],
      'nav': ['1.125rem', '1rem'],
      'h4': ['2rem', '2rem'],
      'h3': ['2rem', '2.5rem'],
      'h2': ['2.5rem', '3rem'],
      'h1sm': ['4rem', '4rem'],
      'h1': ['4.5rem', '4.5rem'],
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      slight: '.03125rem',
      wide: '.0625rem',
      wider: '.09375rem',
      widest: '.125rem',
    },
    extend: {
      screens: {
        'xs': '700px',
        // @media (min-width: 700px)
        'sm': '768px',
        // @media (min-width: 768px)
        'lg': '1000px',
        // @media (min-width: 1000px)
        'xl': '1220px',
        // @media (min-width: 1206px)
        'xxl': '1400px',
        // @media (min-width: 1400px) - used for marketing units in 4 column collection product grid
      },
      transitionProperty: {
        'height': 'height',
        'max-h': 'max-height',
        'filter': "filter",
        'top': 'top',
        'transform-opacity': 'transform opacity',
      },
      height: {
        'header-height': 'var(--header-height)',
      },
      inset: {
        'header-height': 'var(--header-height)',
      },
      colors: {
        /* Utility colors */
        'black': '#1C1C1C',
        'white': '#FFFFFF',
        'gray': '#918B86',
        /* Default settings - update these to match the brand, or leave them with basic values like black, white, gray, etc.
        Removing these will cause errors with js components and CSS */
        'brand-primary-100': '#1C1C1C', /* soft black, text */
        'brand-primary-200': '#FFD6E2', /* Mimi Pink - buttons, etc. */
        'brand-primary-300': '#B1A7A0', /* Dun - dark tan */
        'brand-primary-400': '#FFFFFF', /* white */
        'brand-secondary-100': '#1C1C1C', /* soft black, text */
        'brand-secondary-200': '#FFD6E2', /* Mimi Pink - buttons, etc. */
        'brand-secondary-300': '#B1A7A0', /* Dun - dark tan */
        'brand-secondary-400': '#FFFFFF', /* white */
        'brand-tertiary-100': '#EDECEB', /* light gray - lines and dividers */
        'brand-tertiary-200': '#868484', /* dark gray */
        /* Brand colors specified in Figma */
        'frenchrose': '#FC5290', /* French Rose - dark pink */
        'mimipink': '#FFD6E2', /* Mimi Pink - buttons, etc. */
        'brandpink': '#FDC3D9', /* Brand pink */
        'blush': '#FCEFF3', /* Blush - lightest pink */
        'cerise': '#D8315B', /* Cerise - cherry red */
        'dun': '#B1A7A0', /* Dun - dark tan */
        'timberwolf': '#E4D9D2', /* Timberwolf - light tan */
        'isabelline': '#F7F4F2', /* Isabelline - eggshell white */ 
        'prussianblue': '#052C4C', /* Prussian Blue - dark blue */
        'indigodye': '#13477C', /* Indigo Dye - lighter blue */
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '7': 'repeat(7, minmax(0, 1fr))',
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
}