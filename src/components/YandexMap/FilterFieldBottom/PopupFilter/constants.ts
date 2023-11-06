import type { IButtonPagination, IListFilters } from "./types"

export const BUTTON_PAGINATION: IButtonPagination[] = [
    {
        image: {
            src: "/svg/chevron-left.svg",
            alt: "chevron-left",
        },
        className: "prev",
    },
    {
        image: {
            src: "/svg/chevron-right.svg",
            alt: "chevron-right.svg",
        },
        className: "next",
    },
]

export const LIST_FILTERS: IListFilters[] = [
    {
        label: "Ногти",
        image: {
            src: "/png/type-of-service/nail.png",
            alt: "nail",
        },
        value: "nail",
    },
    {
        label: "Стрижка",
        image: {
            src: "/png/type-of-service/hair.png",
            alt: "hair",
        },
        value: "hair",
    },
    {
        label: "Мейкап",
        image: {
            src: "/png/type-of-service/lipstick.png",
            alt: "lipstick",
        },
        value: "lipstick",
    },
    {
        label: "Еда",
        image: {
            src: "/png/type-of-service/food.png",
            alt: "food",
        },
        value: "food",
    },
    {
        label: "Мода",
        image: {
            src: "/png/type-of-service/lipstic-2.png",
            alt: "lipstick-2",
        },
        value: "lipstick-2",
    },
    {
        label: "Маникюр",
        image: {
            src: "/png/type-of-service/nail.png",
            alt: "manicure",
        },
        value: "manicure",
    },
]
