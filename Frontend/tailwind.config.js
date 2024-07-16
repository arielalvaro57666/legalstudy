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
            bottom: "1000px"
          },
          "50%":{
            bottom: "1500px"
          },
          "75%":{
            bottom: "45%"
          },
          "100%":{
            bottom: "100%"
          },
        }
      },
      animation:{
        'appear-opacity': "appear 2s linear"
      },
      
      backgroundImage: {
        'logo': "url('/static/iconos/logoT.png')",
        'banner': "url('/static/image3.jpg')",
        'cardPicture1': "url('/static/header/card1.jpg')",
        'cardPicture2': "url('/static/header/card2.jpg')",
        'cardPicture3': "url('/static/header/card3.png')",
        'icono': "url('/static/iconos/icono1.png')",
        'icono2': "url('/static/iconos/icono2.png')",
        'lab0': "url('/static/laboral/lab0.png')",
        'lab1': "url('/static/laboral/lab1.png')",
        'lab2': "url('/static/laboral/lab2.png')",
        'lab3': "url('/static/laboral/lab3.png')",
        'lab4': "url('/static/laboral/lab4.png')",
        'lab5': "url('/static/laboral/lab5.png')",
        'lab6': "url('/static/laboral/lab6.png')",
        'lab7': "url('/static/laboral/lab7.png')",
        'civ0': "url('/static/civil/civ0.png')",
        'civ1': "url('/static/civil/civ1.png')",
        'civ2': "url('/static/civil/civ2.png')",
        'fam0': "url('/static/familia/fam0.png')",
        'fam1': "url('/static/familia/fam1.png')",
        'fam2': "url('/static/familia/fam2.png')",
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
