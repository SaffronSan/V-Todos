// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: "/V-ToDos/",
  plugins: [vue()],
  publicPath: process.env.NODE_ENV === 'production' ? '' : ''
});