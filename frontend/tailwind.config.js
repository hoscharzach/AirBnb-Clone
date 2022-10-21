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
          'airbnb-gradient-start': '#FF385C',
          'airbnb-gradient-end': '#BD1E59',
          'start': '#E61E4D',
          'end': '#D70666'
        }
      },
      gridTemplateColumns: {
        'index': 'repeat(auto-fit, minmax(300px, 1fr))',
        'content': 'minmax(0,1fr) max-content',
        'image-grid': '1fr 1fr',
        'trips': 'repeat(auto-fit, minmax(400px, 1fr))'

      },
      gridTemplateRows: {
        'index': 'minmax(250px, 1fr)',
        'image-grid': '1fr 1fr'
      },
      gridAutoRows: {
        'index': 'min-content',
        'image-grid': '1fr',
        'trip-cards': 'minmax(min-content)'
      },
      translate: {
        'click': 'translate-x-0.5 translate-y-0.5'
      },
      aspectRatio: {
        'card': '3 / 4'
      },
      fontFamily: {
        souls: 'souls',
        soulsBold: 'soulsB'
      }
    },
  },
  plugins: [function ({ addVariant }) {
    addVariant('child', '& > *');
    addVariant('child-hover', '& > *:hover');
  }],
}
