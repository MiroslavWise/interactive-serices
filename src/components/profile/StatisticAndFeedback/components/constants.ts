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
        label: "Услуги",
        value: "services",
    },
    // {
    //   label: "Блог",
    //   value: "blogs",
    // },
]
