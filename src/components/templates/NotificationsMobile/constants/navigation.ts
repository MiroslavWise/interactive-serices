export type TTypeWaiting = "all" | "waiting"

interface I {
    label: string
    value: TTypeWaiting
}

export const NAVIGATION_STATUSES: I[] = [
    {
        label: "Все уведомления",
        value: "all",
    },
    {
        label: "Ждут ответа",
        value: "waiting",
    },
]
