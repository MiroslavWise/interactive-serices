/**
 * @description Константы для работы с картой
 */

import { EnumTimesFilter } from "@/components/content/BannerServices/constants"

const DAY = 86_400_000

export const UTILS_DATA_MAP = {
  [EnumTimesFilter.DAYS]: DAY,
  [EnumTimesFilter.WEEK]: DAY * 7,
  [EnumTimesFilter.MONTH]: DAY * 7 * 31,
  now: new Date().valueOf(),
  time(created: string | Date) {
    return new Date(created).valueOf()
  },
}

export const RADIAN = Math.PI / 180
