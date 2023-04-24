/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors:
      {
        ffd: {
          // Fairy Floss Dark gogh
          "1": '#42395D',
          "9": "#75507B",
          "2": "#A8757B",
          "10": "#FFB8D1",
          "3": "#FF857F",
          "11": "#F1568E",
          "4": "#E6C000",
          "12": "#D5A425",
          "20": "#ad851e",
          "5": "#AE81FF",
          "13": "#C5A3FF",
          "6": "#716799",
          "14": "#8077A8",
          "7": "#C2FFDF",
          "15": "#C2FFFF",
          "8": "#F8F8F2",
          "16": "#F8F8F0",
        }
      }
    },
  },
  plugins: [],
}
