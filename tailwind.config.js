/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 自定义一些颜色，符合开发者/TRAE风格
        trae: {
          bg: '#1e1e1e', // 深色背景
          text: '#d4d4d4', // 浅色文字
          accent: '#007acc', // 蓝色强调
          secondary: '#3c3c3c', // 二级背景
          border: '#333333',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      }
    },
  },
  plugins: [],
}
