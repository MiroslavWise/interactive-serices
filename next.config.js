/** @type {import('next').NextConfig} */
// console.log(
//   {
//     NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
//     NEXT_PUBLIC_AUTO_VERIFICATION: process.env.NEXT_PUBLIC_AUTO_VERIFICATION,
//     NEXT_PUBLIC_WEB_SOCKET: process.env.NEXT_PUBLIC_WEB_SOCKET,
//     NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
//     NEXT_PUBLIC_API_KEY_YANDEX: process.env.NEXT_PUBLIC_API_KEY_YANDEX,
//   }
// )
module.exports = {
  output: "standalone",
  // trailingSlash: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_AUTO_VERIFICATION: process.env.NEXT_PUBLIC_AUTO_VERIFICATION,
    NEXT_PUBLIC_WEB_SOCKET: process.env.NEXT_PUBLIC_WEB_SOCKET,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_API_KEY_YANDEX: process.env.NEXT_PUBLIC_API_KEY_YANDEX,
  },
  images: {
    loader: "custom",
    loaderFile: "./src/helpers/functions/myImageLoader.ts",
    formats: ["image/avif", "image/webp"],
    domains: [process.env.NEXT_PUBLIC_DOMAIN || ""],
  },
}
