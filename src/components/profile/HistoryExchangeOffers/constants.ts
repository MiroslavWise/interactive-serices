import type { ISegmentValues } from "@/components/common/Segments/types"

import type { TTypeStatusBarter } from "@/services/file-upload/types"

export const SEGMENTS: ISegmentValues<TTypeStatusBarter>[] = [
    {
        value: "executed",
        label: "Текущее",
    },
    {
        value: "completed",
        label: "Завершенное",
    },
]
