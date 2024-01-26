import { IValuesForm } from "../types/types"

export const MENU_COMPLAINT: IMenuReason[] = [
    {
        value: "fraud",
        label: "Мошенничество или обмен контактными данными",
    },
    {
        value: "insult",
        label: "Неуместное или оскорбительное поведение",
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
    value: IValuesForm["type"]
    label: string
}
