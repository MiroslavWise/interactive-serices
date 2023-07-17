/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: 3000
  },
  images: {
    // dangerouslyAllowSVG: true,
    // contentDispositionType: 'attachment',
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //   }
    // ]
  },
}

module.exports = nextConfig
