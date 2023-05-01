/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "1/20": "5%",
        "1/40": "2.5%",
      },
    },
  },
  plugins: [],
};
