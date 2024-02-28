import { EnumStatusBarter } from "@/types/enum"
import { ISegmentValues } from "@/components/common/Segments/types"

export const SEGMENTS: ISegmentValues<EnumStatusBarter>[] = [
  {
    label: "Текущие",
    value: EnumStatusBarter.EXECUTED,
  },
  {
    label: "Завершённые",
    value: EnumStatusBarter.COMPLETED,
  },
]
