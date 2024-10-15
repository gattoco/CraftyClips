import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }) => ({
  plugins: [solidPlugin()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  base: mode === 'github-pages' ? '/CraftyClips/' : '/',
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
}));
