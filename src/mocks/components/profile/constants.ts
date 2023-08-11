import type { ICardOffer } from "@/components/common/Card/Offer/types"
import type { ICardSuggestion } from "@/components/common/Card/Suggestion/types"
import type { IItems } from "@/components/profile/MainInfo/constants"

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
    name: "Михаил Иванов",
    photo: "/mocks/michael.png",
    geo: "Cir. Shiloh, Hawaii 81063",
    date: "20/07/2023",
    finality: true,
    rating: 5.0,
    price: 410,
  },
]



export const MY_SUGGESTIONS: ICardSuggestion[] = [
  {
    name: "Jenny Wilson",
    can: "Я могу сделать вам макияж и лак для ногтей, а так-же заниматься в дальнейшем обслуживанием вашим",
    photos: [
      {
        url: "/mocks/suggestions/edz-norton-PEttXYw9hi8-unsplash.jpg",
        id: 1,
      },
      {
        url: "/mocks/suggestions/engin-akyurt-EeVOgK2x0E4-unsplash.jpg",
        id: 2,
      },
      {
        url: "/mocks/suggestions/engin-akyurt-GXhGMhhzs9E-unsplash.jpg",
        id: 3,
      },
      {
        url: "/mocks/suggestions/ovinuchi-ejiohuo-vaOosG1lgGE-unsplash.jpg",
        id: 6,
      },
      {
        url: "/mocks/suggestions/jamie-coupaud-_B5vT7ZfCzg-unsplash.jpg",
        id: 5,
      },
      {
        url: "/mocks/suggestions/hayley-kim-studios-sRSRuxkOuzI-unsplash.jpg",
        id: 4,
      },
    ],
    rating: {
      average: 4.5,
      total: 21,
    },
  },
  {
    name: "Jenny Wilson",
    can: "Я могу сделать вам макияж и лак для ногтей.",
    photos: [
      {
        url: "/mocks/suggestions/edz-norton-PEttXYw9hi8-unsplash.jpg",
        id: 1,
      },
      {
        url: "/mocks/suggestions/hayley-kim-studios-sRSRuxkOuzI-unsplash.jpg",
        id: 4,
      },
      {
        url: "/mocks/suggestions/engin-akyurt-EeVOgK2x0E4-unsplash.jpg",
        id: 2,
      },
      {
        url: "/mocks/suggestions/jamie-coupaud-_B5vT7ZfCzg-unsplash.jpg",
        id: 5,
      },
      {
        url: "/mocks/suggestions/ovinuchi-ejiohuo-vaOosG1lgGE-unsplash.jpg",
        id: 6,
      },
    ],
    rating: {
      average: 4.5,
      total: 21,
    },
  },
  {
    name: "Jenny Wilson",
    can: "Я могу сделать вам макияж и лак для ногтей.",
    photos: [
      {
        url: "/mocks/suggestions/edz-norton-PEttXYw9hi8-unsplash.jpg",
        id: 1,
      },
      {
        url: "/mocks/suggestions/engin-akyurt-EeVOgK2x0E4-unsplash.jpg",
        id: 2,
      },
      {
        url: "/mocks/suggestions/engin-akyurt-GXhGMhhzs9E-unsplash.jpg",
        id: 3,
      },
      {
        url: "/mocks/suggestions/hayley-kim-studios-sRSRuxkOuzI-unsplash.jpg",
        id: 4,
      },
      {
        url: "/mocks/suggestions/jamie-coupaud-_B5vT7ZfCzg-unsplash.jpg",
        id: 5,
      },
      {
        url: "/mocks/suggestions/ovinuchi-ejiohuo-vaOosG1lgGE-unsplash.jpg",
        id: 6,
      },
    ],
    rating: {
      average: 4.5,
      total: 21,
    },
  },
  {
    name: "Jenny Wilson",
    can: "Я могу сделать вам макияж и лак для ногтей.",
    photos: [
      {
        url: "/mocks/suggestions/edz-norton-PEttXYw9hi8-unsplash.jpg",
        id: 1,
      },
      {
        url: "/mocks/suggestions/engin-akyurt-EeVOgK2x0E4-unsplash.jpg",
        id: 2,
      },
      {
        url: "/mocks/suggestions/engin-akyurt-GXhGMhhzs9E-unsplash.jpg",
        id: 3,
      },
      {
        url: "/mocks/suggestions/hayley-kim-studios-sRSRuxkOuzI-unsplash.jpg",
        id: 4,
      },
      {
        url: "/mocks/suggestions/jamie-coupaud-_B5vT7ZfCzg-unsplash.jpg",
        id: 5,
      },
      {
        url: "/mocks/suggestions/ovinuchi-ejiohuo-vaOosG1lgGE-unsplash.jpg",
        id: 6,
      },
    ],
    rating: {
      average: 4.5,
      total: 21,
    },
  },
  
]