import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    // root: 'src',
    
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./*.html'), 
      },
      outDir: 'dist', 
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.js', './*.html']),
      SortCss({ sort: 'mobile-first' }),
    ],
  };
});