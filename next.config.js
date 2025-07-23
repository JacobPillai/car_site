/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/car_site' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/car_site/' : '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig 