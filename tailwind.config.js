/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/component/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        "nasa-blue": "#0b3d91",
        "nasa-red": "#fc3d21",
        "nasa-gray-dark": "#323a45",
        "nasa-gray-light": "#aeb0b5",
        "nasa-gray-warm-dark": "#494440",
      },
    },
  },
  plugins: [],
};
