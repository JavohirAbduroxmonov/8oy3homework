/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#15101C",
        focusedColor: "rgb(62, 22, 113)",
        inputColor: "#777777",
        violetColor: "#9E78CF",
        lightGreen: "#78CFB0",
        bgColor: "gb(30, 30, 30)",
        boxBg: "#1D1825",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
