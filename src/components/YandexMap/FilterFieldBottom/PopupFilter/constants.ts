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