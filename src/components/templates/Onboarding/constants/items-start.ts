import { EnumTypeProvider } from "@/types/enum"

interface IItemsStart {
  sub: string
  footer?: {
    title: string
    icon: string
  }
  action: EnumTypeProvider | null
}

export const ITEMS_START: IItemsStart[] = [
  {
    sub: "Создать",
    footer: {
      title: "Предложение",
      icon: "/svg/3d/3d-speaker.svg",
    },
    action: EnumTypeProvider.offer,
  },
  {
    sub: "Создать",
    footer: {
      title: "SOS-сообщение",
      icon: "/svg/3d/3d-sos.svg",
    },
    action: EnumTypeProvider.alert,
  },
  {
    sub: "Создать",
    footer: {
      title: "Обсуждение",
      icon: "/svg/3d/3d-message.svg",
    },
    action: EnumTypeProvider.discussion,
  },
  {
    sub: "Попробовать позже",
    action: null,
  },
]
