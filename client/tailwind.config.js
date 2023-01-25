/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#0ea5e9',
            'light-primary': '#f0f9ff',
            'dark-primary': '#0284c7',
         },
      },
   },
   plugins: [],
};
