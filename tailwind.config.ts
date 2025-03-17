import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        softPurple: "#F3E8FF",
      },
      animation: {
        "progress-timer": "progress 5s linear infinite",
      },
      keyframes: {
        progress: {
          "0%": { "--progress": "100%" },
          "100%": { "--progress": "0%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
