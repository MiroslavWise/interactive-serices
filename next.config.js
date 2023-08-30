/** @type {import('next').NextConfig} */

module.exports = {
    output: "export",
    env: {
        PORT: 3000,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
        NEXT_PUBLIC_AUTO_VERIFICATION:
            process.env.NEXT_PUBLIC_AUTO_VERIFICATION,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
        domains: [process.env.NEXT_PUBLIC_DOMAIN],
    },
}
