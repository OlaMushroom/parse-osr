import { build } from 'esbuild'
await build({
  bundle: true,
  entryPoints: ['src/index.js'],
  outdir: 'lib',
  packages: 'external',
  platform: 'neutral',
  format: 'esm',
  minify: true,
})