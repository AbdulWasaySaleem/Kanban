/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors:{ "mainBackgroundColor" : "#B8E2F2", "columnBackgroundColor": "#77C3EC"}},
  },
  plugins: [],
}

