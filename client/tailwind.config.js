/** @type {import('tailwindcss').Config} */

const colors = {
   primary: '#0ea5e9',
   'primary-light': '#f0f9ff',
   'primary-dark': '#0284c7',
};

module.exports = {
   darkMode: 'dark',
   content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
   ],
   theme: {
      extend: {
         colors,
         fontSize: {
            xs: '0.625rem',
         },
      },
   },
   plugins: [require('daisyui')],
   daisyui: {
      styled: true,
      themes: [
         {
            light: {
               ...require('daisyui/src/colors/themes')['[data-theme=light]'],
               primary: colors['primary'],
               'primary-focus': colors['primary-dark'],
            },
         },
      ],
      base: true,
      utils: true,
      logs: true,
      rtl: false,
      prefix: '',
      darkTheme: 'dark',
   },
};
