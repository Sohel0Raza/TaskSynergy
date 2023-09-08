/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#bbeef1",

          "secondary": "#5ebec4",

          "accent": "#7b19fc",

          "neutral": "#1d2126",

          "base-100": "#FFFFFF",

          "info": "#4084dd",

          "success": "#187c4a",

          "warning": "#f1bc5b",

          "error": "#fb4649",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}