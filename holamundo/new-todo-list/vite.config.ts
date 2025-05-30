import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
	VueI18nPlugin({
	  include: [fileURLToPath(new URL('./src/locales/**', import.meta.url))],
	  compositionOnly: true, // Use the Composition API only
	  runtimeOnly: false, // Enable runtime-only mode
	}),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
