/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          colors: {
        master: '#F6E8EA',
        masterbeta: '#e1cfd2',
        inwall: '#EF626C',
        btns: '#0E0004',
        success: '#34a853',
        action: '#1c74e9',
        page: '#1F2023',
        delete: '#EA4334',
        bg: '#fbbd04'
      },
    },
  },
  plugins: [],
}
