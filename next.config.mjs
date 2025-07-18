/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    jsxImportSource: "react",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
