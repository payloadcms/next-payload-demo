const { withPayload } = require('@payloadcms/next-payload')
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = withPayload({
  reactStrictMode: true,
  experimental: {
    outputFileTracingExcludes: {
      '**/*': ['node_modules/@swc/core-linux-x64-gnu', 'node_modules/@swc/core-linux-x64-musl']gi
    },
  },
  images: {
    domains: [
      'localhost',
      'https://nextjs-vercel.payloadcms.com',
      process.env.NEXT_PUBLIC_APP_URL,
      process.env.NEXT_PUBLIC_S3_ENDPOINT
    ],
  },
}, {
  configPath: path.resolve(__dirname, './payload/payload.config.ts'),
})

module.exports = nextConfig