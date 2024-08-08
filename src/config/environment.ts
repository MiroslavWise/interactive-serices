const env = {
  server: {
    host: process.env.NEXT_PUBLIC_URL!,
    port: Number(process.env.PORT!),
  },
  websocket: process.env.NEXT_PUBLIC_WEB_SOCKET!,
  auto_verification: Boolean(process.env.NEXT_PUBLIC_AUTO_VERIFICATION),
  api_key_yandex: process.env.NEXT_PUBLIC_API_KEY_YANDEX!,
} as const
export default env

export const URL_APPLE_APP =
  "https://apps.apple.com/ru/app/sheira/id6504366029"
