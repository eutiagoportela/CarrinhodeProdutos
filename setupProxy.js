import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:7287', // Substitua pela URL do seu servidor de back-end
      changeOrigin: true,
    }),
  );
}
