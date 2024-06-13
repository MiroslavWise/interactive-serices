/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      current: "currentColor",
      "text-primary": "var(--text-primary)",
      "element-accent-1": "var(--element-accent-1)",
      "grey-stroke-light": "var(--grey-stroke-light)",
      "BG-second": "var(--BG-second)",
      "text-button": "var(--text-button)",
      "text-error": "var(--text-error)",
      "element-white": "var(--element-white)",
      "text-tab": "var(--text-tab)",
    },
    extend: {
      spacing: {
        0.875: "0.875rem",
        0.625: "0.625rem",
        0.375: "0.375rem",
      },
    },
  },
  plugins: [],
}
