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
      colors: {
        primary: {
          500: "#f6c160",
          600: "#e0b058",
        },
        secondary: {
          500: "#f6b060",
          600: "#db9c53",
        },
        background: {
          700: "#292929",
          800: "#1a88b9",
        },
        gray: {
          300: "#f8f9fa",
          400: "#adb5bd",
        },
      },
    },
  },
  plugins: [],
};
export default config;
