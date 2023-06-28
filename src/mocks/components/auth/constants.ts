import { ISegmentValues } from "@/components/common/Segments/types"

export const MOCK_DATA_PEOPLE: { photo: string, name: string, geo: string, services: { value: string, name: string }[], rate: number }[] = [
  {
    photo: "/mocks/maria.png",
    name: "Мария Иванова",
    geo: "Cir. Shiloh, Hawaii 81063",
    services: [
      {
        value: "nails",
        name: "Nails",
      },
      {
        value: "hair",
        name: "Hair Cut",
      }
    ],
    rate: 5,
  },
  {
    photo: "/mocks/elena.png",
    name: "Алена Шварц",
    geo: "Ln. Mesa, New Jersey 45463",
    services: [
      {
        value: "nails",
        name: "Nails",
      },
      {
        value: "hair",
        name: "Hair Cut",
      }
    ],
    rate: 3.8,
  },
  {
    photo: "/mocks/michael.png",
    name: "Михаил Прохоров",
    geo: "Dr. Richardson, California 62639",
    services: [
      {
        value: "nails",
        name: "Nails",
      },
      {
        value: "hair",
        name: "Hair Cut",
      }
    ],
    rate: 4.5,
  },
  {
    photo: "/mocks/alina.png",
    name: "Алина Морозова",
    geo: "San Jose, South Dakota 83475",
    services: [
      {
        value: "nails",
        name: "Nails",
      },
      {
        value: "hair",
        name: "Hair Cut",
      }
    ],
    rate: 4.8,
  },
  {
    photo: "/mocks/maria.png",
    name: "Мария Иванова",
    geo: "Cir. Shiloh, Hawaii 81063",
    services: [
      {
        value: "nails",
        name: "Nails",
      },
      {
        value: "hair",
        name: "Hair Cut",
      }
    ],
    rate: 4.7,
  },
  {
    photo: "/mocks/maria.png",
    name: "Мария Иванова",
    geo: "Cir. Shiloh, Hawaii 81063",
    services: [
      {
        value: "nails",
        name: "Nails",
      },
      {
        value: "hair",
        name: "Hair Cut",
      }
    ],
    rate: 4.7,
  },
  {
    photo: "/mocks/maria.png",
    name: "Мария Иванова",
    geo: "Cir. Shiloh, Hawaii 81063",
    services: [
      {
        value: "nails",
        name: "Nails",
      },
      {
        value: "hair",
        name: "Hair Cut",
      }
    ],
    rate: 4.7,
  },
]

export const MOCK_ACHIEVEMENTS: string[] = [
  "/svg/achievements/arms.svg",
  "/svg/achievements/gold-medal.svg",
  "/svg/achievements/shield-crown.svg",
  "/svg/achievements/shield.svg",
]

export const BADGES: { title: string, total: number }[] = [
  {
    title: "Доступные предложения",
    total: 24,
  },
  {
    title: "Биржи закрыты",
    total: 18,
  },
  {
    title: "Обзор и рейтинг",
    total: 4.5,
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
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
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
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      images: []
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 5,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      images: [
        "/mocks/Frame_50127758.png",
        "/mocks/Frame_50127759.png",
      ]
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 4.5,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      images: [
        "/mocks/Frame_50127758.png",
        "/mocks/Frame_50127759.png",
      ]
    },
  ]