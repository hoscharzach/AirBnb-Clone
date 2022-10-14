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
        'index': 'repeat(auto-fit, minmax(270px, 1fr))',
        'content': 'minmax(0,1fr) max-content',
        'image-grid': 'repeat(2, minmax(200px, 1fr))'

      },
      gridTemplateRows: {
        'index': 'minmax(300px, 1fr)'
      },
      gridAutoRows: {
        'index': 'minmax(290px, 350px)'
      },
    },
  },
  plugins: [function ({ addVariant }) {
    addVariant('child', '& > *');
    addVariant('child-hover', '& > *:hover');
  }],
}
