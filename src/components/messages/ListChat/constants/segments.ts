import type { TTypeProviderThreads } from "@/services/threads/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

export const SEGMENTS_CHAT: (ISegmentValues<TTypeProviderThreads> & { img: string })[] = [
    {
        label: "Личные",
        value: "personal",
        img: "/svg/users-03.svg",
    },
    {
        label: "Обмен",
        value: "barter",
        img: "/svg/repeat-white.svg",
    },
]
