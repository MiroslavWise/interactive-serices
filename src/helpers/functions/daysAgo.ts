import { ru } from "date-fns/locale"
import { formatRelative, subDays, lightFormat, getTime, format, formatDistanceToNow } from "date-fns"

export const daysAgo = (date?: Date | string) => (!!date ? formatRelative(subDays(date, 0), new Date(), { locale: ru }) : "")
export const dayFormat = (date?: Date | string, format?: string) => (!!date ? lightFormat(date, format ?? "HH:mm dd.MM.yyyy") : null)
export const getMillisecond = (date?: Date | string) => getTime(date!)

export const formatOfMMM = (date: Date | string) => format(date, "dd MMM 'в' HH:mm", { locale: ru })
export const formatOfMMMM = (date: Date | string, formatD?: string) => format(date, formatD ? formatD : "dd MMMM yyyy", { locale: ru })
export const fromNow = (date: Date | string) => formatDistanceToNow(date, { locale: ru })
