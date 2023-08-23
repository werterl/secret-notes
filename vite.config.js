import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    clearScreen: false,
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'resources/js/tests/setup.js'
    },
    plugins: [
        laravel(['resources/js/App.jsx']),
        react(),
        eslint()
    ],
    server: {
        hmr: {
            host: 'localhost',
        },
    },
    esbuild: {
        loader: 'jsx',
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
});
