import { ru } from "date-fns/locale"
import { formatRelative, subDays, lightFormat, getTime } from "date-fns"

export const daysAgo = (date?: Date | string) => (!!date ? formatRelative(subDays(date, 0), new Date(), { locale: ru }) : "")
export const dayFormat = (date?: Date | string, format?: string) => (!!date ? lightFormat(date, format ?? "HH:mm dd.MM.yyyy") : null)
export const getMillisecond = (date?: Date | string) => getTime(date!)
