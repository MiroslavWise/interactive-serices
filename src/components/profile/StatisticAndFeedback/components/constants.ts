import type { TItemInteractive } from "../types/types"

interface IItemsInteractive{
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
    value: "proposals",
  },
  {
    label: "Запросы",
    value: "requests",
  },
  {
    label: "Сообщение блога",
    value: "blog_message",
  },
]