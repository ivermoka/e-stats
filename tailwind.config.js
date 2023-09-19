/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "401px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1380px",
      xxl: "1536px",
    },
    extend: {
      colors: {
        text: "#fdfbfe",
        bg: "#02040A",
        primary: "#1C1B29",
        secondary: "#292841",
        accent: "#21262C",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
