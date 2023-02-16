const { withPayload } = require('@payloadcms/next-payload')

/** @type {import('next').NextConfig} */
const nextConfig = withPayload({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'https://nextjs-vercel.payloadcms.com',
      process.env.NEXT_PUBLIC_APP_URL,
      process.env.NEXT_PUBLIC_S3_ENDPOINT
    ],
  },
})

module.exports = nextConfig