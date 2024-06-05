/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%":{
            opacity: "0%"
          },
          "50%":{
            opacity: "50%"
          },
          "75%":{
            opacity: "75%"
          },
          "100%":{
            opacity: "100%"
          },
        }
      },
      animation:{
        'appear-opacity': "appear 2s linear"
      },
      
      backgroundImage: {
        'logo': "url('../style/logoT.png')",
        'banner': "url('../style/image3.jpg')",
        'cardPicture': "url('../style/puesto1_4.jpg')",
        'cardPicture2': "url('../style/card2.jpg')",
        'cardPicture3': "url('../style/card3.jpg')",
        'icono': "url('../style/icono1.png')",
        'icono2': "url('../style/icono2.png')",
        'lab0': "url('../style/laboral/lab0.png')",
        'lab1': "url('../style/laboral/lab1.png')",
        'lab2': "url('../style/laboral/lab2.png')",
        'lab4': "url('../style/laboral/lab4.png')",
        'lab5': "url('../style/laboral/lab5.png')",
        'lab6': "url('../style/laboral/lab6.png')",
        'lab7': "url('../style/laboral/lab7.png')",
        'civ0': "url('../style/civil/civ0.png')",
        'civ1': "url('../style/civil/civ1.png')",
        'civ2': "url('../style/civil/civ2.png')",
        'fam0': "url('../style/familia/fam0.png')",
        'fam1': "url('../style/familia/fam1.png')",
        'fam2': "url('../style/familia/fam2.png')",
      },
      fontFamily: {
        title: ['Lexend Deca', 'sans-serif'],
      },
      fontSize:{
        '12pt': '16px',
        '15pt': '21px'
      }
    },
  },
  plugins: [],
}
