import type { ISegmentValues } from "@/components/common/Segments/types"

export type TGenericSegmentsValue = "email" | "phone"

export const VALUES_EMAIL_PHONE: ISegmentValues<TGenericSegmentsValue>[] = [
    {
        label: "Телефон",
        value: "phone",
    },
    {
        label: "Email",
        value: "email",
    },
]
