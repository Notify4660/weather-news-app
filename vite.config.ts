import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/news': {
          target: 'https://newsapi.org',
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(path, 'http://localhost');
            const q = url.searchParams.get('q') || 'Moscow';
            return `/v2/everything?q=${encodeURIComponent(q)}&apiKey=${env.NEWS_API_KEY}&pageSize=10&language=en&sortBy=publishedAt`;
          },
        },
      },
    },
  };
});