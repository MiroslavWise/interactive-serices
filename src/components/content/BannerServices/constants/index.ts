import { ISegmentValues } from "@/components/common/Segments/types"
import type { TServicesFilter } from "../types/types"
import { EnumTypeProvider } from "@/types/enum"

export const SERVICES: ISegmentValues<TServicesFilter>[] = [
  {
    value: "all",
    label: "Все сервисы",
  },
  {
    value: EnumTypeProvider.offer,
    label: "Предложения",
  },
  {
    value: EnumTypeProvider.discussion,
    label: "Дискуссии",
  },
  {
    value: EnumTypeProvider.alert,
    label: "SOS",
  },
]

export enum EnumTimesFilter {
  "ALL" = "all",
  "DAYS" = "days",
  "WEEK" = "week",
  "MONTH" = "month",
}

export const TIMES: { label: string; value: EnumTimesFilter }[] = [
  {
    label: "Всё время",
    value: EnumTimesFilter.ALL,
  },
  {
    label: "Сутки",
    value: EnumTimesFilter.DAYS,
  },
  {
    label: "Неделя",
    value: EnumTimesFilter.WEEK,
  },
  {
    label: "Месяц",
    value: EnumTimesFilter.MONTH,
  },
]
