import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: "#dec9e9",
          100: "#dac3e8",
          200: "#d2b7e5",
          300: "#c19ee0",
          400: "#b185db",
          500: "#a06cd5",
          600: "#9163cb",
          700: "#815ac0",
          800: "#7251b5",
          900: "#6247aa",
        },
        yaana: {
          gold: "#a06cd5",
          "gold-light": "#dac3e8",
          "gold-dark": "#815ac0",
          cream: "#dec9e9",
          "cream-dark": "#dac3e8",
          forest: "#9163cb",
          "forest-light": "#815ac0",
          charcoal: "#000000",
          "charcoal-light": "#6247aa",
          nearblack: "#000000",
          "lavender-base": "#dec9e9",
          "soft-lavender": "#dac3e8",
          "dark-lavender": "#9163cb",
          "deep-lavender": "#815ac0",
          "floral-lavender": "#d2b7e5",
        },
      },
      borderRadius: {
        card: "0.5rem",
        btn: "0.375rem",
      },
      fontFamily: {
        serif: ["Poppins", "system-ui", "sans-serif"],
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        looser: "0.05em",
        luxury: "0.08em",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;

