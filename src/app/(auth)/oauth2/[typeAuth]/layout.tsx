import { type Metadata } from "next"

import { ETypeAuth } from "@/types/enum"

import OAuthLayout from "@/components/common/OAuthLayout"

const title: Record<ETypeAuth, string> = {
  [ETypeAuth.GOOGLE]: "Google",
  [ETypeAuth.TELEGRAM]: "Telegram",
  [ETypeAuth.VK]: "ВКонтакте",
  [ETypeAuth.YANDEX]: "Яндекс",
}

const icon: Record<ETypeAuth, string> = {
  [ETypeAuth.GOOGLE]: "/icons/fill/google.svg",
  [ETypeAuth.TELEGRAM]: "/icons/fill/telegram.svg",
  [ETypeAuth.VK]: "/icons/fill/vk.svg",
  [ETypeAuth.YANDEX]: "/icons/fill/yandex.svg",
}

export function generateMetadata({ params: { typeAuth } }: { params: { typeAuth: ETypeAuth } }): Metadata {
  const is = Object.values(ETypeAuth).includes(typeAuth)

  if (!is) return {}

  return {
    title: title[typeAuth],
    icons: {
      icon: icon[typeAuth],
    },
    openGraph: {
      title: title[typeAuth],
    },
    twitter: {
      title: title[typeAuth],
    },
    appleWebApp: {
      title: title[typeAuth],
    },
  }
}

export default OAuthLayout
