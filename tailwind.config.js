/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './content/**/*.md',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: ['dark', 'dark-mode'],
}
