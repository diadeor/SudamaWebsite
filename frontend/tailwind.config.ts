import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

// We use "as Config" to get full TypeScript support
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this matches your project
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        heading: ["Lato", ...defaultTheme.fontFamily.sans],
        jetbrains: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
} satisfies Config;
