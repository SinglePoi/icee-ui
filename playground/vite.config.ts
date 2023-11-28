import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import DefineOptions from 'unplugin-vue-define-options/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Inspect from 'vite-plugin-inspect'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
