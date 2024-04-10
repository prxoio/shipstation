/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore during builds
    ignoreDuringBuilds: process.env.DISABLE_ESLINT === 'true',
  },
}

export default nextConfig
