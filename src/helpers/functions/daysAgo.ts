import dayjs from "dayjs"

const FORMAT_DAY = "DD-MM-YYYY"

export function daysAgo(date: Date | string): string {
    if (dayjs(date).format(FORMAT_DAY) === dayjs().format(FORMAT_DAY)) {
        return "сегодня"
    }
    return dayjs(date).fromNow(true)
}
