import { ISegmentValues } from "@/components/common/Segments/types"

export const SERVICES: ISegmentValues<string>[] = [
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
