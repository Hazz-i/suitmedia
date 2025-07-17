import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			'/api': {
				target: 'https://suitmedia-backend.suitdev.com',
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/api/, '/api'),
			},
			'/storage': {
				target: 'https://assets.suitdev.com',
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/storage/, '/storage'),
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
					Referer: 'https://suitmedia-backend.suitdev.com',
					Origin: 'https://suitmedia-backend.suitdev.com',
				},
			},
		},
	},
});
