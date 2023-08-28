import { DispatchWithoutAction } from "react"



interface IValues{
  user: string
  my_photo: string
}

interface IReturnMessage{
  avatar_url: string
  isMe: boolean
  message: string
  time: string
}

export const MESSAGES_CHAT = ({user, my_photo }: IValues): IReturnMessage[]  => ([
  {
    avatar_url: user,
    isMe: false,
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "10:02",
  },
  {
    avatar_url: my_photo,
    isMe: true,
    message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    time: "10:02",
  },
  {
    avatar_url: user,
    isMe: false,
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "10:02",
  },
  {
    avatar_url: my_photo,
    isMe: true,
    message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    time: "10:02",
  },
  {
    avatar_url: user,
    isMe: false,
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "10:02",
  },
  {
    avatar_url: my_photo,
    isMe: true,
    message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    time: "10:02",
  },
])

export type TTypeActionMenu = "onProfile" | "openBarter" | "deleteChat" | "allRequest" | "currentExchanges"

export interface IMenuItemPopup{
  image: {
    url: string
    alt: string
  }
  label: string
  value: TTypeActionMenu
}

export const MENU_ITEM_POPUP: IMenuItemPopup[] = [
  {
    image: {
      url: "/svg/user-black.svg",
      alt: "user-black",
    },
    label: "Профиль",
    value: "onProfile",
  },
  {
    image: {
      url: "/svg/repeat-black.svg",
      alt: "repeat-black",
    },
    label: "Послать запрос",
    value: "openBarter",
  },
  {
    image: {
      url: "/svg/trash-black.svg",
      alt: "trash-black",
    },
    label: "Удалить чат",
    value: "deleteChat",
  },
  {
    image: {
      url: "/svg/file-black.svg",
      alt: "file-black",
    },
    label: "Все запросы",
    value: "allRequest",
  },
  {
    image: {
      url: "/svg/grid-black.svg",
      alt: "grid-black",
    },
    label: "Текущие обмены",
    value: "currentExchanges",
  },
]