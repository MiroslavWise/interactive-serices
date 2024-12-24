import { type TServicesFilter } from "../types/types"
import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { type ISegmentValues } from "@/components/common/Segments/types"

export const SERVICES: ISegmentValues<TServicesFilter>[] = [
  {
    value: "all",
    label: "Всe",
  },
  {
    value: EnumTypeProvider.offer,
    label: "Предложения",
  },
  {
    value: EnumTypeProvider.POST,
    label: "Посты",
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

export const OBJ_TIME: Record<EnumTimesFilter, string> = {
  [EnumTimesFilter.ALL]: "Всё время",
  [EnumTimesFilter.DAYS]: "Сутки",
  [EnumTimesFilter.WEEK]: "Неделя",
  [EnumTimesFilter.MONTH]: "Месяц",
}

export const MAP_TIME = Object.entries(OBJ_TIME) as [EnumTimesFilter, string][]

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

const OBJ_URGENT: Record<EnumHelper, string> = {
  [EnumHelper.HELP_KURSK]: "Щедрое сердце",
}

export const MAP_URGENT = Object.entries(OBJ_URGENT) as [EnumHelper, string][]
