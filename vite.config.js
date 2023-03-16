import mkcert from 'vite-plugin-mkcert';

export default {
  server: {
    host: 'local.dev',
    port: 8888,
    https: 'true',
  },
  plugins: [mkcert()],
};
