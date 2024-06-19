/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", // Existing path for HTML and JS files
    "./styles/**/*.css",     // New path for all CSS files in the /styles directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
