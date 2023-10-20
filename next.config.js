/** @type {import('next').NextConfig} */
var path = require("path")

module.exports = {
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
    // sassOptions: {
    //     includePaths: [path.join(__dirname, "scss/init")],
    // },
    // plugins: [
    //     new webpack.IgnorePlugin({
    //         checkResource(resourse) {
    //             return true
    //         },
    //     }),
    // ],
    // webpack(config) {
    //     if (config.optimization.splitChunks) {
    //         config.optimization.splitChunks.cacheGroups.shared = {
    //             name: "app-other",
    //             test: /\.css$/,
    //             chunks: "all",
    //             enforce: true,
    //         }
    //     }
    //     config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

    //     return config
    // },
}
