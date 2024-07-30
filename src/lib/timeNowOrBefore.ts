import { dayFormat } from "@/helpers"

export function timeNowOrBeforeChatHours(time: Date | string): string | null {
  if (!time) return null
  return dayFormat(time, "HH:mm")
}
