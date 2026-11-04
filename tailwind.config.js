/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        editorial: {
          paper: "#f9f8f5",
          paperDark: "#f3f1ec",
          ink: "#12151c",
          muted: "#667085",
          borderLight: "rgba(0, 0, 0, 0.08)",
          gold: "#997328",
          goldLight: "#b88e39",
          cardLight: "#ffffff",
        }
      },
      fontFamily: {
        serif: ["'Newsreader'", "'Playfair Display'", "'Cinzel'", "'Didot'", "'Bodoni MT'", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        mono: ["'JetBrains Mono'", "Fira Code", "monospace"],
      },
      boxShadow: {
        'framed': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'framed-light': '0 20px 40px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.15)',
        'card-light': '0 2px 10px -2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'glow-gold': '0 0 25px -5px rgba(197, 160, 89, 0.3)',
      }
    },
  },
  plugins: [],
}
