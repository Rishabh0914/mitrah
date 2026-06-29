/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDF8F4",
        blush: "#F7D9D9",
        rose: "#E8B4B8",
        sage: "#CDE2D0",
        sageDeep: "#A7C7AE",
        lavender: "#DCD3F0",
        sky: "#CFE5F0",
        sand: "#F5E6D3",
        ink: "#4A4A52",
        cocoa: "#6B5E5A",
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Nunito"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(120, 100, 110, 0.25)",
        glow: "0 8px 30px -10px rgba(180, 150, 200, 0.4)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
