import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const __filename = new URL('.', import.meta.url).pathname
const __dirname = path.dirname(__filename)

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'lib')
        }
    },
    root: '.',
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            name: 'XUIDesign',
            formats: ['es', 'cjs'],
            fileName: (format) =>
                format === 'es' ? 'index.esm.js' : 'index.js'
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
})