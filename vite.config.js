// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested1: resolve(__dirname, 'src/routes/kanji/kanji.html'),
        nested2: resolve(__dirname, 'src/routes/quiz/quiz.html'),
        nested3: resolve(__dirname, 'src/routes/user/user.html'),
      },
    },
  },
  resolve:{
    alias:{
      '$' : resolve(__dirname, './src'),
      "$lib": resolve(__dirname, "./src/lib")
    },
  }
})