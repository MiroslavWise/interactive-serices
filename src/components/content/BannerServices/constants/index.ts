import { ISegmentValues } from "@/components/common/Segments/types"
import type { TServices } from "../types/types"

export const SERVICES: ISegmentValues<TServices>[] = [
    {
        value: "all",
        label: "Все сервисы",
    },
    {
        value: "offer",
        label: "Предложения",
    },
    {
        value: "request",
        label: "Запросы",
    },
]
