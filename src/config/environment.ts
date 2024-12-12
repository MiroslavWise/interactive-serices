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

export const APPLE_ID = "6504366029"
export const URL_APPLE_APP = `https://apps.apple.com/ru/app/sheira/id${APPLE_ID}`
export const APPLE_NAME = "Sheira: услуги и обсуждения"

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
  "найти специалиста",
]
