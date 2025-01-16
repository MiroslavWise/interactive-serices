"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"

import { ETypeAuth } from "@/types/enum"

import VK from "@/components/oAuth/vk"
import Google from "@/components/oAuth/google"
import Telegram from "@/components/oAuth/telegram"
import Yandex from "@/components/oAuth/yandex"

const component: Record<ETypeAuth, ReactNode> = {
  [ETypeAuth.VK]: <VK />,
  [ETypeAuth.GOOGLE]: <Google />,
  [ETypeAuth.TELEGRAM]: <Telegram />,
  [ETypeAuth.YANDEX]: <Yandex />,
}

export default ({ params: { typeAuth } }: { params: { typeAuth: ETypeAuth } }) => {
  const { push } = useRouter()
  const is = Object.values(ETypeAuth).includes(typeAuth)

  useEffect(() => {
    if (!is) {
      push("/")
    }
  }, [is])

  if (is) {
    return component[typeAuth]
  } else {
    return null
  }
}
