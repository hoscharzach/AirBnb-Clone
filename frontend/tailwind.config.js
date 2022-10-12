/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          'airbnb-brand-color': '#FF385C',
        }
      }
    },
  },
  plugins: [function ({ addVariant }) {
    addVariant('child', '& > *');
    addVariant('child-hover', '& > *:hover');
  }],
}

// radial-gradient(circle at center,
//   #FF385C 0%,
//   #E61E4D 27.5%,
//   #E31C5F 40%,
//   #D70466 57.5%,
//   #BD1E59 75%,
//   #BD1E59 100%
// ) !important
