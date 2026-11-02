import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
// Single-file build (everything inlined) so you can host/share one index.html
export default defineConfig({ plugins: [react(), viteSingleFile()] })
