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
      editor:{
        "btn-icon":"#c0c2c4",
        "text":"#DCDCDC",
        "body": "#1c1c1b",
        // "body": "#1a1a18",
        // "body": "#1f2323",
        'imgShowcase':"#2d2e30",
        "scrollbar": "#6b7280",
      },
      },
      width: {
"13": "3%",
      },
      maxWidth: {
        '800': '800px',
        '1000': "1000px",
      },
      margin: {
        "2px": "2px",
        "3%":"30px",
        "363px": "363px",
      }
    },
  },
  plugins: [],
}
