import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  build: {
    minify: false,
    manifest: true,
    cssCodeSplit: false,
    rollupOptions: {

      input: {
        main: resolve(__dirname, 'client/js/bundle.js'),
        style: resolve(__dirname, 'client/css/bundle.css')
      },
      plugins: [nodeResolve()]
    }
  }
}
