/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        small: "16px",
      },
      colors: {
        primary: "#0a0a0a",
        secondary: "#6b7280",
        tertiary: "#f5f5f5",
        accent: "#00d688",
        openToSelling: "#d68800",
      },
      boxShadow: {
        "t-sm": "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
        "t-md":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "t-lg":
          "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "t-xl":
          "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "t-2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
        "t-3xl": "0 -35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
