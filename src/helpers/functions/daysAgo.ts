import dayjs from "dayjs"

export function daysAgo(date?: Date | string): string {
    if (!date) {
        return ""
    }
    return dayjs(date).fromNow(true)
}
