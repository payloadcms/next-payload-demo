/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      process.env.NEXT_PUBLIC_CMS_URL
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
  ]
}

module.exports = nextConfig
