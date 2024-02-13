import { TTypeProvider } from "@/services/file-upload/types"

interface IItemsStart {
  sub: string
  footer?: {
    title: string
    icon: string
  }
  action: TTypeProvider | null
}

export const ITEMS_START: IItemsStart[] = [
  {
    sub: "Создать первое",
    footer: {
      title: "Предложение",
      icon: "/svg/3d/3d-speaker.svg",
    },
    action: "offer",
  },
  {
    sub: "Создать первое",
    footer: {
      title: "SOS-сообщение",
      icon: "/svg/3d/3d-sos.svg",
    },
    action: "alert",
  },
  {
    sub: "Создать первое",
    footer: {
      title: "Дискуссию",
      icon: "/svg/3d/3d-message.svg",
    },
    action: "discussion",
  },
  {
    sub: "Попробовать позже",
    action: null,
  },
]
