/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#1a1b1e",
        "bg-secondary": "#25262b",
        "bg-input": "#2c2d33",
        accent: "#2563eb",
        "accent-shadow": "rgba(37, 99, 235, 0.2)",
        "text-primary": "#ffffff",
        "text-secondary": "#9CA3AF",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      fontFamily: {
        inter: ["Inter"],
        jakarta: ["Plus Jakarta Sans"],
      },
      transitionDuration: {
        300: "300ms",
      },
    },
  },
  plugins: [],
};
