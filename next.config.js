const { withPayload } = require("@payloadcms/next-payload");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = withPayload(
  {
    eslint: {
      ignoreDuringBuilds: true,
    },
    transpilePackages: [
      "@payloadcms/plugin-seo",
      "payload/components/forms",
      "payload/components",
    ],
    images: {
      domains: [
        "localhost",
        "nextjs-vercel.payloadcms.com",
        process.env.NEXT_PUBLIC_APP_URL,
        `${process.env.NEXT_PUBLIC_S3_ENDPOINT}`.replace("https://", ""),
      ],
    },
    webpack: {
      resolve: {
        alias: {},
      },
    },
  },
  {
    configPath: path.resolve(__dirname, "./payload/payload.config"),
  }
);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: true,
});

module.exports =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
