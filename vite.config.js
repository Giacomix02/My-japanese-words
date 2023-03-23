// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'src/routes/kanji/kanji.html'),
        nested: resolve(__dirname, 'src/routes/quiz/quiz.html'),
        nested: resolve(__dirname, 'src/routes/user/user.html'),
      },
    },
  },
})