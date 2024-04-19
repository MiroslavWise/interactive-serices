import { dayFormat } from "@/helpers"

export function timeNowOrBeforeChat(time: Date | string): string | null {
  if (!time) return null
  if (time) {
    if (dayFormat(time, "dd.MM.yy") !== dayFormat(new Date(), "dd.MM.yy")) {
      return dayFormat(time, "HH:mm dd.MM")
    }
    return dayFormat(time, "HH:mm")
  }
  return null
}

export function timeNowOrBeforeChatHours(time: Date | string): string | null {
  if (!time) return null
  return dayFormat(time, "HH:mm")
}
