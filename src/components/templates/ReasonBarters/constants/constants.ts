import type { TTypeReason } from "@/services/barters/types"

export const MENU_REASON: IMenuReason[] = [
    {
        value: "found-specialist",
        label: "Уже нашёл(а) специалиста на другом сайте",
    },
    {
        value: "found-through-friend",
        label: "Уже нашёл(а) специалиста через знакомых",
    },
    {
        value: "circumstances",
        label: "Изменились обстоятельства",
    },
    {
        value: "specialists",
        label: "Не подошли специалисты",
    },
    {
        value: "company-service",
        label: "Не устроил сервис компании",
    },
    {
        value: "spam",
        label: "Это спам",
    },
    {
        value: "other",
        label: "Другое",
    },
]

interface IMenuReason {
    value: TTypeReason
    label: string
}
