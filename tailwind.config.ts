import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'sm-white': '0 0 3px 1px rgba(255, 255, 255, 0.4)',
        'sm-black': '0 0 3px 1px rgba(0 0 0 0.4)',

      },
      colors: {
        textBlue: "#1d9bf0",
        textBlack: "#202124",
        textPink: "#ea4aaa",
        textGrayLine: "#2f3336",
        textGray: "#71767b",
        textBlackBtn: "#3c4043",
        textGrayBtn: "#5f6368",
        white: "#e7e9ea",
        textGreen: "#00ba7c",
        textPinkPrimary: "#f91880",

        iconBackgroundGray: "#161616",
        iconHoverBackgroundGray: "#2e2f30",

        bgHoverWhite: "#e0e0e0",
        bgHoverBlue: "rgba(29,155,240,0.1)",
        bgActiveBlue: "rgba(29,155,240,0.2)",
        bgMain: "rgba(71,74,77,0.3)",
        bgBtnSecondary: "#eff3f4",
        bgPinkGhost: "#f4212e",
        bgBlueFocus: "#1D9BF0",
        bgGray16181c: "#16181c",
        bgHoverGray: "rgba(255, 255, 255, 0.03)",

        borderGrayPrimary: "#333639",
        borderGraySecond: "#536473",
        borderBlue: "#66b3ff",
      },
    },
  },
  plugins: [],
};
export default config;
