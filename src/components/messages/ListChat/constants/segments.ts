import type { TTypeProviderThreads } from "@/services/threads/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

export const SEGMENTS_CHAT: ISegmentValues<TTypeProviderThreads>[] = [
    {
        label: "Личные",
        value: "personal",
    },
    {
        label: "Обмен",
        value: "barter",
    },
]
