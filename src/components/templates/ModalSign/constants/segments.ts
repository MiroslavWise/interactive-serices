import type { ISegmentValues } from "@/components/common/Segments/types"
import type { TTypeEmailOrNumber } from "@/store/types/useVisibleAndTypeAuthModalState"

export const VALUES_EMAIL_PHONE: ISegmentValues<TTypeEmailOrNumber>[] = [
  {
    label: "Телефон",
    value: "phone",
  },
  {
    label: "Email",
    value: "email",
  },
]
