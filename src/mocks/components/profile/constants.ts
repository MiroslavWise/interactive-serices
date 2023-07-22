import { ICardOffer } from "@/components/common/Card/Offer/types"
import type { IItems } from "@/components/profile/MainInfo/constants"

// name: string
// geo: string
// date: string
// finality: string
// chatId?: string | number
// price: number

export const PEOPLES: IItems[] = [
  {
    assignment: "one",
    src: "/mocks/alina.png",
  },
  {
    assignment: "two",
    src: "/mocks/elena.png",
  },
  {
    assignment: "three",
    src: "/mocks/maria.png",
  },
  {
    assignment: "four",
    src: "/mocks/michael.png",
  },
]

export const HISTORY_OFFERS_MOCKS: ICardOffer[] = [
  {
    name: "Алина Иванова",
    photo: "/mocks/alina.png",
    geo: "Cir. Shiloh, Hawaii 81063",
    date: "20/07/2023",
    finality: true,
    rating: 4.5,
    price: 300,
  },
  {
    name: "Елена Иванова",
    photo: "/mocks/elena.png",
    geo: "Cir. Shiloh, Hawaii 81063",
    date: "20/07/2023",
    finality: false,
    rating: 3.5,
    price: 550,
  },
  {
    name: "Мария Иванова",
    photo: "/mocks/maria.png",
    geo: "Cir. Shiloh, Hawaii 81063",
    date: "20/07/2023",
    finality: true,
    rating: 3.3,
    price: 400,
  },
  {
    name: "Михаил Иванов",
    photo: "/mocks/michael.png",
    geo: "Cir. Shiloh, Hawaii 81063",
    date: "20/07/2023",
    finality: true,
    rating: 5.0,
    price: 410,
  },
  {
    name: "Алина Иванова",
    photo: "/mocks/alina.png",
    geo: "Cir. Shiloh, Hawaii 81063",
    date: "20/07/2023",
    finality: false,
    rating: 3.4,
    price: 610,
  },
]