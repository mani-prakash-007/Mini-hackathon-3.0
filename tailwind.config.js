/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
    },

    extend: {
      fontSize: {
        s: ["10px", "12.1px"],
      },
      spacing: {
        side_1: "68px",
        side_2: "216px",
        0.5: "2px",
        1.18: "4.75px",
        2.22: "8.89px",
        2.25: "9px",
        7.77: "31.11px",
        13: "54px",
        16.5: "66px",
        104: "414px",
      },
      colors: {
        darkblue: "#000342",
        lavendergrey: "#B2B3CA",
        gainsboro: "#D9D9DD",
        darkslategray: "#333568",
        snow : "#fafafa"
      },
      borderRadius: {
        m: "4.8px",
      },
    },
  },
  plugins: [],
};
