/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        swarm: {
          primary: '#6366f1',
          dark: '#0f0f23',
          card: '#1a1a2e',
          accent: '#22d3ee',
          green: '#10b981',
          red: '#ef4444',
        },
      },
    },
  },
  plugins: [],
};
