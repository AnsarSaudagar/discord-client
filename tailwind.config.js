/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeSlideIn: {
          '0%': { transform: 'translateY(-300px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeSlideIn: 'fadeSlideIn 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

