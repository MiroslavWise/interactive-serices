import { ICardBlog } from "@/components/common/Card/Blog/types"
import { IRequestsAndProposals } from "@/components/common/Card/RequestsAndProposals/types"

import image1 from "../../../../public/mocks/proposcals/image 14 (1).png"
import image2 from "../../../../public/mocks/proposcals/image 14.png"
import image3 from "../../../../public/mocks/proposcals/f02c1a9d9887e604264b6c0a2e38287b.png"

export const MOCKS_SERVICES: { label: string, photo: string }[] = [
  {
    photo: "/mocks/Nail.png",
    label: "Ногти",
  },
  {
    photo: "/mocks/hair.png",
    label: "Стрижка",
  }
]

export const MOCK_DATA_PEOPLE: { photo: string, name: string, geo: string, services: { label: string }[], rate: number }[] = [
  {
    photo: "/mocks/maria.png",
    name: "Мария Иванова",
    geo: "Индустриальная улица, 18, Нижневартовск",
    services: MOCKS_SERVICES,
    rate: 5,
  },
  {
    photo: "/mocks/elena.png",
    name: "Алена Шварц",
    geo: "Владимирский спуск, 15, Владимир",
    services: MOCKS_SERVICES,
    rate: 3.8,
  },
  {
    photo: "/mocks/michael.png",
    name: "Михаил Прохоров",
    geo: "ул. Космонавта Леонова, 84, Пермь",
    services: MOCKS_SERVICES,
    rate: 4.5,
  },
  {
    photo: "/mocks/alina.png",
    name: "Алина Морозова",
    geo: "Индустриальная улица, 6, Нижневартовск",
    services: MOCKS_SERVICES,
    rate: 4.8,
  },
  {
    photo: "/mocks/maria.png",
    name: "Мария Иванова",
    geo: "Суворовский проспект, 18, Санкт-Петербург",
    services: MOCKS_SERVICES,
    rate: 4.7,
  },
  {
    photo: "/mocks/maria.png",
    name: "Мария Иванова",
    geo: "пр. Косыгина, 23к1, Санкт-Петербург",
    services: MOCKS_SERVICES,
    rate: 4.7,
  },
  {
    photo: "/mocks/maria.png",
    name: "Мария Иванова",
    geo: "Суворовский проспект, 38, Санкт-Петербург",
    services: MOCKS_SERVICES,
    rate: 4.7,
  },
]

export const MOCK_ACHIEVEMENTS: string[] = [
  "/svg/achievements/arms.svg",
  "/svg/achievements/gold-medal.svg",
  "/svg/achievements/shield-crown.svg",
  "/svg/achievements/shield.svg",
]

export const BADGES: { title: string, total: number, rating_movement?: "up" | "down" }[] = [
  {
    title: "Доступные предложения",
    total: 24,
    rating_movement: "up",
  },
  {
    title: "Обмены закрыты",
    total: 18,
    rating_movement: "down",
  },
  {
    title: "Обзор и рейтинг",
    total: 4.5,
    rating_movement: "up",
  },
]

export const MOCKS_REVIEW_VALUES: {
  user: string
  date: string
  rate: number
  description: string
  images: string[]
}[] = [
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 4,
      description: "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
      images: [
        "/mocks/Frame_50127758.png",
        "/mocks/Frame_50127759.png",
        "/mocks/Frame_50127759.png",
        "/mocks/Frame_50127759.png",
        "/mocks/Frame_50127759.png",
        "/mocks/Frame_50127759.png",
      ]
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 3,
      description: "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
      images: []
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 5,
      description: "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
      images: [
        "/mocks/Frame_50127758.png",
        "/mocks/Frame_50127759.png",
      ]
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 4.5,
      description: "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
      images: [
        "/mocks/Frame_50127758.png",
        "/mocks/Frame_50127759.png",
      ]
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 4.5,
      description: "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
      images: [
        "/mocks/Frame_50127758.png",
        "/mocks/Frame_50127759.png",
      ]
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 4.5,
      description: "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
      images: [
        "/mocks/Frame_50127758.png",
        "/mocks/Frame_50127759.png",
      ]
    },
  ]



export const MOCKS_BLOGS_CARD: ICardBlog[] = [
  {
    title: "Узнайте, как правильно покупать и использовать органическую косметику.",
    photo: "/mocks/blogs/image 15.png",
    services: MOCKS_SERVICES,
  },
  {
    title: "Узнайте, как правильно покупать и использовать органическую косметику.",
    photo: "/mocks/blogs/image 15 (1).png",
    services: MOCKS_SERVICES,
  },
  {
    title: "Узнайте, как правильно покупать и использовать органическую косметику.",
    photo: "/mocks/blogs/image 15 (2).png",
    services: MOCKS_SERVICES,
  },
]

const PHOTOS_PROPOSALS: any[] = [image1, image2, image3]

export const MOCKS_PROPOSALS: IRequestsAndProposals[] = [
  {
    title: "Я могу сделать вам макияж и лак для ногтей.",
    services: MOCKS_SERVICES,
    photos: PHOTOS_PROPOSALS,
  },
  {
    title: "Я могу сделать вам макияж и лак для ногтей.",
    services: MOCKS_SERVICES,
    photos: PHOTOS_PROPOSALS,
  },
  {
    title: "Я могу сделать вам макияж и лак для ногтей.",
    services: MOCKS_SERVICES,
    photos: PHOTOS_PROPOSALS,
  },
  {
    title: "Я могу сделать вам макияж и лак для ногтей.",
    services: MOCKS_SERVICES,
    photos: PHOTOS_PROPOSALS,
  },
  {
    title: "Я могу сделать вам макияж и лак для ногтей.",
    services: MOCKS_SERVICES,
    photos: PHOTOS_PROPOSALS,
  },
  {
    title: "Я могу сделать вам макияж и лак для ногтей.",
    services: MOCKS_SERVICES,
    photos: PHOTOS_PROPOSALS,
  },
]