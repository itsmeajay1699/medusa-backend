import { loadEnv, defineConfig } from "@medusajs/framework/utils"
loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },


  plugins: [
    {
      resolve: `@medusajs/file-s3`,
      options: {
        s3_url: process.env.S3_URL,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access_key_id: process.env.S3_ACCESS_KEY_ID,
        secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
        // optional
        cache_control: process.env.S3_CACHE_CONTROL,
        // optional
        download_file_duration:
          process.env.S3_DOWNLOAD_FILE_DURATION,
      },
    },
    "medusa-plugin-razorpay-v2",
    "@sgftech/payment-razorpay",
  ],

  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "medusa-plugin-razorpay-v2/providers/payment-razorpay/src",
            id: "razorpay",
            options: {
              key_id: process.env.RAZORPAY_ID,
              key_secret: process.env.RAZORPAY_SECRET,
              razorpay_account: process.env.RAZORPAY_ACCOUNT,
              webhook_secret: process.env.RAZORPAY_WEBHOOK_SECRET,
              automatic_expiry_period: 30,
              manual_expiry_period: 20,
              refund_speed: "normal",
            },
          },
        ],
      },
    },
  ],
})
