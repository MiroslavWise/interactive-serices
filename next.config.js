/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    env: {
        PORT: 3000,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
        NEXT_PUBLIC_AUTO_VERIFICATION:
            process.env.NEXT_PUBLIC_AUTO_VERIFICATION,
        NEXT_PUBLIC_WEB_SOCKET: process.env.NEXT_PUBLIC_WEB_SOCKET,
        NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
        NEXT_PUBLIC_API_KEY_YANDEX: process.env.NEXT_PUBLIC_API_KEY_YANDEX,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
        domains: [process.env.NEXT_PUBLIC_DOMAIN],
    },
}

module.exports = nextConfig
