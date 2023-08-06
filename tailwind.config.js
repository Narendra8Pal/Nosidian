/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        body:{
"main-bg": "#1a1916",
"normal": "#7649e6"
        },
      home:{
 'left-pane': "#212120",
 'gray': "#5e5e5e",
      },
      },
      width: {
"13": "3%"
      },
      margin: {
        "2px": "2px",
        "3%":"30px"
      }
    },
  },
  plugins: [],
}
