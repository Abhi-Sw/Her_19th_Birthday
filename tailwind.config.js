/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neonPink: "#ff00ff",
        neonBlue: "#00faff",
        neonPurple: "#a855f7",
      },
    },
  },
  plugins: [],
};
