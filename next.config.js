/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { dev }) => {
      if (!dev) {
        const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')({
          enabled: true,
        })
        config.plugins.push(new BundleAnalyzerPlugin())
      }
      return config
    },
  }),
}

module.exports = nextConfig
