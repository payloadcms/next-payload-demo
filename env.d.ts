declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string
    POSTGRES_URI: string
    PAYLOAD_SECRET: string
    PAYLOAD_CONFIG_PATH: string
    NEXT_PUBLIC_APP_URL: string
    PAYLOAD_PUBLIC_CMS_URL: string
    S3_ACCESS_KEY_ID: string
    S3_SECRET_ACCESS_KEY: string
    S3_REGION: string
    NEXT_PUBLIC_S3_ENDPOINT: string
    NEXT_PUBLIC_S3_BUCKET: string
    PAYLOAD_PRIVATE_REGENERATION_SECRET: string
    NEXT_PRIVATE_REGENERATION_SECRET: string
    ANALYZE: string
  }
}