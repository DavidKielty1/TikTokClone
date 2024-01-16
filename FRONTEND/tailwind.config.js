/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pinkred: "#F02C56",
        offwhite: "#F1F1F1",
        grey: "#838383",
        darkblue: "#161724",
      },
    },
  },
  plugins: [],
};
