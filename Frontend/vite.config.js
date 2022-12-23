import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
// import {readFileSync} from 'fs'
// import {resolve} from 'path'

dns.setDefaultResultOrder('verbatim') // to ensure localhost deployment

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [react()],
    server:{
      port: 5173,
      // https:{
      //   key: readFileSync(resolve('localhost-key.pem')),
      //   cert: readFileSync(resolve('localhost.pem'))
      // }
    }
  });
}