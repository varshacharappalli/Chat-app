/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // ✅ Ensure paths are correct
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // ✅ Add DaisyUI if needed
};

