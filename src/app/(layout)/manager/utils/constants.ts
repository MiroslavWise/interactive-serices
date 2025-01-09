import { EnumTypeProvider } from "@/types/enum"

export enum ELinkManager {
  OFFER = "offer",
  USERS = "users",
  COMPLAINTS = "complaints",
  POSTS = "posts",
  CATEGORIES = "categories",
}

export type TLinkManager = `/manager/${ELinkManager}`

interface I {
  label: string
  path: TLinkManager
}

export const LINKS: I[] = [
  {
    label: "Активности",
    path: "/manager/offer",
  },
  {
    label: "Пользователи",
    path: "/manager/users",
  },
  {
    label: "Жалобы",
    path: "/manager/complaints",
  },
  {
    label: "События",
    path: "/manager/posts",
  },
  {
    label: "Категории",
    path: "/manager/categories",
  },
]

export type TLOffer = "all" | EnumTypeProvider.alert | EnumTypeProvider.offer

interface ILOffer {
  label: string
  path: TLOffer
}

export const LINKS_OFFER: ILOffer[] = [
  {
    label: "Все активности",
    path: "all",
  },
  {
    label: "Предложения",
    path: EnumTypeProvider.offer,
  },
  {
    label: "SOS-сообщения",
    path: EnumTypeProvider.alert,
  },
]
