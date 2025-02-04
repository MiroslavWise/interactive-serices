import { ru } from "date-fns/locale"
import { formatRelative, subDays, lightFormat, getTime, format, formatDistanceToNow, getDate } from "date-fns"

export const daysAgo = (date?: Date | string) =>
  !!date ? formatRelative(subDays(date as unknown as Date, 0), new Date(), { locale: ru }) : ""
export const dayFormat = (date?: Date | string, format?: string) =>
  !!date ? lightFormat(date as unknown as Date, format ?? "HH:mm dd.MM.yyyy") : null
export const getMillisecond = (date?: Date | string) => getTime((date! as unknown as Date) ?? new Date())

export const formatOfMMM = (date: Date | string) => format(date as unknown as Date, "dd MMM 'в' HH:mm", { locale: ru })
export const formatOfMMMM = (date: Date | string, formatD?: string) =>
  format(date as unknown as Date, formatD ? formatD : "dd MMMM yyyy", { locale: ru })
export const fromNow = (date: Date | string) => formatDistanceToNow(date as unknown as Date, { locale: ru })
