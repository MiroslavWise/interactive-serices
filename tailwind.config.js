/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      current: "currentColor",
      "text-primary": "var(--text-primary)",
      "text-secondary": "var(--text-secondary)",
      "element-accent-1": "var(--element-accent-1)",
      "grey-stroke-light": "var(--grey-stroke-light)",
      "BG-second": "var(--BG-second)",
      "BG-icons": "var(--BG-icons)",
      "text-button": "var(--text-button)",
      "more-green": "var(--more-green)",
      "text-attention": "var(--text-attention)",
      "text-error": "var(--text-error)",
      "element-white": "var(--element-white)",
      "text-tab": "var(--text-tab)",
      translucent: "rgba(5, 1, 13, 0.50)",
      transparent: "transparent",
      "grey-field": "var(--grey-field)",
      "grey-separator": "var(--grey-separator)",
      "element-error": "var(--element-error)",
      "text-accent": "var(--text-accent)",
    },
    extend: {
      spacing: {
        0.125: "0.125rem",
        0.875: "0.875rem",
        0.625: "0.625rem",
        0.375: "0.375rem",
        "2rem": "2rem",
      },
      boxShadow: {
        "social-link": "0px 11px 20px 0px rgba(100, 104, 115, 0.1)",
      },
    },
  },
  plugins: [],
}
