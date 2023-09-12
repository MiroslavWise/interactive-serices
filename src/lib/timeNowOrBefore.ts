import dayjs from "dayjs"

const FORMAT_DAY = "YYYY-MM-DD"

export function timeNowOrBeforeChat(time: Date | string): string | null {
    if(!time) return null
    
    if (dayjs(time).format(FORMAT_DAY) === dayjs().format(FORMAT_DAY)) {
        return dayjs(time).format("HH:mm")
    }
    if (time) {
        return dayjs(time).format("HH:mm DD.MM")
    }
    return null
}
