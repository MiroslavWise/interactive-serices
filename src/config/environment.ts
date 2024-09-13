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
  "https://apps.apple.com/ru/app/sheira-%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8-%D0%B8-%D0%BE%D0%B1%D1%81%D1%83%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F/id6504366029"

export const keyWords = [
  "разместить услугу",
  "найти услугу",
  "поиск услуги",
  "обмен услугами",
  "бартер",
  "события",
  "новости моего города",
  "найти на карте",
  "найти рядом",
  "соседи",
  "место на карте",
  "адрес на карте",
  "куда пойти",
  "услуги на карте",
  "услуга за услугу",
  "шейра",
  "sheira",
]
