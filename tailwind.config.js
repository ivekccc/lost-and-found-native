/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#5856D6",
        success: "#34C759",
        warning: "#FF9500",
        error: "#FF3B30",
        background: "#FFFFFF",
        surface: "#F2F2F7",
        text: {
          primary: "#000000",
          secondary: "#666666",
          placeholder: "#999999",
        },
        border: "#CCCCCC",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
  },
  plugins: [],
};
