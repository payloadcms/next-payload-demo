/** @type {import('next').NextConfig} */
const nextConfig = {
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
  rewrites: async () => [
    {
      "source": "/admin",
      "destination": "/admin/index.html"
    },
    {
      "source": "/admin/:path*",
      "destination": "/admin/index.html"
    }
  ],
  async headers() {
    return [
      {
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*'
      }
    ]
  },
  transpilePackages: ['payload', 'mongoose']
}

module.exports = nextConfig