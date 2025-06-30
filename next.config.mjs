/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  // Remover assetPrefix y basePath para desarrollo local
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/empanada-calculator/' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/empanada-calculator' : '',
}

export default nextConfig
