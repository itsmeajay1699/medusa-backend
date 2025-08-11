import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: "http://localhost:3000,https://docs.medusajs.com,https://ancient-living-51n7.vercel.app",
      adminCors: "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com,https://ancient-living-51n7.vercel.app",
      authCors: "http://localhost:5173,http://localhost:9000,http://localhost:3000,https://docs.medusajs.com,https://ancient-living-51n7.vercel.app",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },

  plugins: [
    {
      resolve: "@medusajs/file-local",
      options: {
        upload_dir: "uploads"
      }
    }
  ],

})
