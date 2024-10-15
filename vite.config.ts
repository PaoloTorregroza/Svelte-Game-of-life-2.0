import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Svelte-Game-of-life-2.0/',
  plugins: [svelte()],
})
