import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rakshya-offline-assets',
      enforce: 'post',
      generateBundle(_, bundle) {
        const files = ['index.html', 'manifest.json', 'icon.svg', 'icon-192.png', 'icon-512.png'];
        const assets = [...new Set([...files, ...Object.keys(bundle)])].map(file => '/' + file);
        const hash = createHash('sha256');
        for (const file of assets) {
          const output = bundle[file.slice(1)];
          hash.update(file);
          hash.update(output ? (output.type === 'chunk' ? output.code : output.source) : readFileSync('public' + file));
        }
        const worker = readFileSync('src/service-worker.js', 'utf8')
          .replace('__CACHE_VERSION__', hash.digest('hex').slice(0, 16))
          .replace('__ASSETS__', JSON.stringify(assets));
        this.emitFile({ type: 'asset', fileName: 'sw.js', source: worker });
      },
    },
  ],
});
