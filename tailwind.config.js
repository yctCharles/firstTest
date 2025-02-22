/** @type {import('tailwindcss').Config} */
import color from "tailwindcss/colors";
//import "./asserts/css/font-family.css";
export default {
  content: [
    "components/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "app.{js,ts,vue}",
    "error.{js,ts,vue}",
    "content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        primary: color.green,
      },
      fontFamily: {
        round: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
