import type { IOffersCard } from "./types/types"

export const OFFERS_CARD: IOffersCard[] = [
  {
    label: "Текущие биржи",
    src: "/svg/offer/hexagon_offer.svg",
    value: "current",
  },
  {
    label: "Завершенные обмены",
    src: "/svg/offer/clipboard.svg",
    value: "completed",
  },
]