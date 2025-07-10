import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: parseInt(env.VITE_PORT) || 3009,
      allowedHosts: ['cod.ulakx.com', 'localhost', '10.0.12.55'],
      proxy: {
        '/api': `http://localhost:${env.PORT || 3008}`,
        '/ws': {
          target: `ws://localhost:${env.PORT || 3008}`,
          ws: true
        },
        '/shell': {
          target: `ws://localhost:${env.PORT || 3008}`,
          ws: true
        }
      }
    },
    build: {
      outDir: 'dist'
    }
  }
})
