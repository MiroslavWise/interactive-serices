import { EnumStatusBarter } from "@/types/enum"
import { ISegmentValues } from "@/components/common/Segments/types"

export const SEGMENTS: ISegmentValues<EnumStatusBarter>[] = [
  {
    label: "Текущее",
    value: EnumStatusBarter.EXECUTED,
  },
  {
    label: "Завершённое",
    value: EnumStatusBarter.COMPLETED,
  },
]
