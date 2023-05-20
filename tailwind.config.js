/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "locked-pattern": "url('/images/locked.jpeg')",
      },
    },
  },
  plugins: [],
};
