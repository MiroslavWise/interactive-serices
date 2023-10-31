import type { ISegmentValues } from "@/components/common/Segments/types"
import type { TTypeSegment } from "../types/types"

export const VALUES: ISegmentValues<TTypeSegment>[] = [
    {
        value: "reviews",
        label: "Отзывы",
    },
    {
        value: "services",
        label: "Услуги",
    },
    // {
    //     value: "blogs",
    //     label: "Блог",
    // },
]
