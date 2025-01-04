const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,vue}",
    "./components/**/*.{ts,tsx,vue}",
    "./app/**/*.{ts,tsx,vue}",
    "./src/**/*.{ts,tsx,vue}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      width: {
        cw10r: "10rem",
        cw20r: "20rem",
        cw30r: "30rem",
        cw50r: "50rem",
        cw70r: "70rem",
        cw90r: "90rem",
        cw100r: "100rem",
        cw100vh: "100vh",
      },
      maxWidth: {
        mw10r: "10rem",
        mw15r: "15rem",
        mw20r: "20rem",
        mw30r: "30rem",
        mw100r: "100rem",
      },
      height: {
        ch30r: "30rem",
        ch40r: "40rem",
        ch50r: "50rem",
        ch60r: "60rem",
        ch70vh: "70vh",
        ch80vh: "80vh",
        ch90vh: "90vh",
        ch100vh: "100vh",
      },
      borderWidth: {
        "1px": "1px",
      },
      borderRadius: {
        "2px": "2px",
      },
      fontSize: {
        "0.7rem": "0.7rem",
      },
    },
  },
  plugins: [animate],
};
