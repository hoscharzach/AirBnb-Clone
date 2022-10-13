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
          'airbnb-gradient-end': '#BD1E59'
        }
      },
      gridTemplateColumns: {
        // 'image-grid': 'grid-template-columns: minmax(200px, 1fr) minmax(200px, 1fr)',
        'index': 'repeat(auto-fill, minmax(270px, 1fr))',
        'content': 'minmax(0,1fr) max-content',
        'image-grid': 'repeat(2, minmax(200px, 1fr))'

      },
      gridAutoRows: {
        'index': 'minmax(350px, auto)'
      }
    },
  },
  plugins: [function ({ addVariant }) {
    addVariant('child', '& > *');
    addVariant('child-hover', '& > *:hover');
  }],
}
