import type { IItemsMenu } from "./types"

export const MENU_ITEMS = (isAuth: boolean): IItemsMenu[] => ([
  {
    label: "Карта",
    path: "",
    icon: {
      fill: "/icons/mobile/fill/map-filled.svg",
      regular: "/icons/mobile/regular/map-regular.svg",
    },
    isCenter: false,
  },
  {
    label: "Обмен",
    path: "sharing",
    icon: {
      fill: "/icons/mobile/fill/sharing-filled.svg",
      regular: "/icons/mobile/regular/sharing-regular.svg",
    },
    isCenter: false,
  },
  {
    label: isAuth ? "Профиль" : "Войти",
    path: isAuth ? "profile" : null,
    icon: {
      fill: isAuth ? "/icons/mobile/fill/profile-active-filled.svg" : "/icons/mobile/fill/profile-no-auth-filled.svg",
      regular: isAuth ? "/icons/mobile/regular/profile-active-regular.svg" : "/icons/mobile/regular/profile-no-auth-regular.svg",
    },
    isCenter: true,
  },
  {
    label: "Сообщения",
    path: "messages",
    icon: {
      fill: "/icons/mobile/fill/message-filled.svg",
      regular: "/icons/mobile/regular/message-regular.svg",
    },
    isCenter: false,
  },
  {
    label: "Блог",
    path: "blog",
    icon: {
      fill: "/icons/mobile/fill/blog-filled.svg",
      regular: "/icons/mobile/regular/blog-regular.svg",
    },
    isCenter: false,
  },
])