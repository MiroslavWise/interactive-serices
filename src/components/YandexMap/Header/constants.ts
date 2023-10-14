import type { ISegmentValues } from "@/components/common/Segments/types"

export const SERVICES: ISegmentValues<"offers" | "Events">[] = [
    {
        value: "offers",
        label: "Предложения",
    },
    {
        value: "Events",
        label: "События",
    },
]
