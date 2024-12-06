/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "primary": "var(--primary)",
      "secondary": "var(--secondary)",
      "error": "var(--error)",
      "success": "var(--success)",
      "white": "var(--white)",
      "secondary-main": "var(--secondary-main)",
      "secondary-light": "var(--secondary-light)",
      "secondary-dark": "var(--secondary-dark)",
      "default-light": "var(--default-light)",
    }
  },
  plugins: [],
}
