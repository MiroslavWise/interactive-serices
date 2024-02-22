import { ISegmentValues } from "@/components/common/Segments/types"
import type { TServices } from "../types/types"
import { EnumTypeProvider } from "@/types/enum"

export const SERVICES: ISegmentValues<TServices>[] = [
  {
    value: "all",
    label: "Все сервисы",
  },
  {
    value: EnumTypeProvider.offer,
    label: "Предложения",
  },
  // {
  //     value: "request",
  //     label: "Запросы",
  // },
]
