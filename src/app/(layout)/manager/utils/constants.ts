import { EnumTypeProvider } from "@/types/enum"

export enum ELinkManager {
  OFFER = "activities",
  USERS = "users",
  COMPLAINTS = "complaints",
  CATEGORIES = "categories",
  COMPANIES = "companies",
  REVIEWS = "reviews",
}

export type TLinkManager = `/manager/${ELinkManager}`

interface I {
  label: string
  path: TLinkManager
}

export const LINKS: I[] = [
  {
    label: "Активности",
    path: "/manager/activities",
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
    label: "Категории",
    path: "/manager/categories",
  },
  {
    label: "Компании",
    path: "/manager/companies",
  },
  {
    label: "Отзывы",
    path: "/manager/reviews",
  },
]

export type TLOffer = EnumTypeProvider.alert | EnumTypeProvider.offer | EnumTypeProvider.POST

interface ILOffer {
  label: string
  path: TLOffer
}

export const LINKS_OFFER: ILOffer[] = [
  {
    label: "Предложения",
    path: EnumTypeProvider.offer,
  },
  {
    label: "SOS-сообщения",
    path: EnumTypeProvider.alert,
  },
  {
    label: "События",
    path: EnumTypeProvider.POST,
  },
]
