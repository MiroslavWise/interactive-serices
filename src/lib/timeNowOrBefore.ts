import dayjs from "dayjs"

export function timeNowOrBeforeChat(time: Date | string): string | null {
  if (!time) return null
  if (time) {
    if (dayjs(time).format("DD-MM-YY") !== dayjs().format("DD-MM-YY")) {
      return dayjs(time).format("HH:mm DD.MM")
    }
    return dayjs(time).format("HH:mm")
  }
  return null
}
