import { ISegmentValues } from "types/general"

export const SERVICES: ISegmentValues[] = [
    {
      value: "all",
      label: "Все сервисы",
    },
    {
      value: "offers",
      label: "Предложения",
    },
    {
      value: "requests",
      label: "Запросы",
    },
]

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