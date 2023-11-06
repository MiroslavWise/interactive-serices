import type { IOffersCard } from "./types/types"

export const OFFERS_CARD: IOffersCard[] = [
    {
        label: "Текущие обмены",
        src: "/svg/offer/hexagon_offer.svg",
        value: "executed",
    },
    {
        label: "Завершенные обмены",
        src: "/svg/offer/clipboard.svg",
        value: "completed",
    },
]
