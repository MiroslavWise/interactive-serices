import type { TItemInteractive } from "../types/types"

export interface IItemsInteractive {
    label: string
    value: TItemInteractive
}

export const ITEMS_INTERACTIVE: IItemsInteractive[] = [
    {
        label: "Отзывы",
        value: "reviews",
    },
    {
        label: "Предложения",
        value: "services",
    },
    // {
    //   label: "Блог",
    //   value: "blogs",
    // },
]

