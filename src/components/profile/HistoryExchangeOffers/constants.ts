import type { ISegmentValues } from "@/components/common/Segments/types"

import { EnumStatusBarter } from "@/types/enum"

export const SEGMENTS: ISegmentValues<EnumStatusBarter>[] = [
  {
    value: EnumStatusBarter.EXECUTED,
    label: "Текущее",
  },
  {
    value: EnumStatusBarter.COMPLETED,
    label: "Завершенное",
  },
]
