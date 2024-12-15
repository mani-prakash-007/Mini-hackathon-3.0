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
        bs: ["13px", "15.73px"],
        l: ["20px", "24.2px"],
      },
      spacing: {
        side_1: "68px",
        side_2: "216px",
        0.5: "2px",
        1.18: "4.75px",
        2.22: "8.89px",
        2.25: "9px",
        3.125: "12.5px",
        3.75: "15px",
        5.5: "22px",
        7.77: "31.11px",
        13: "54px",
        16.5: "66px",
        28.5: "114px",
        30: "120px",
        47.87: "191.5px",
        73.5: "294px",
        104: "414px",
        109.5: "438px",
        141.75: "567px",
        289: "1156px",
      },
      colors: {
        darkblue: "#000342",
        darknavyblue: "#050552",
        lavendergrey: "#B2B3CA",
        gainsboro: "#D9D9DD",
        darkslategray: "#333568",
        snow: "#fafafa",
        neonblue: "#554EF1",
        lavender: "#eae9f9",
      },
      borderRadius: {
        m: "4.8px",
        5: "5px",
      },
    },
  },
  plugins: [],
};
