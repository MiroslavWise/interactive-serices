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

export const DESCRIPTION_NOTIFICATIONS_EMPTY: Record<TTypeWaiting, string> = {
  all: "Здесь будут появляться уведомления о новых событиях и SOS-сообщениях, отзывах, статусах умений и услуг и многое другое. Вы будете проинформированы обо всем важном.",
  waiting: "Здесь будут появляться уведомления, требующего вашего ответа. Например, ответить на комментарий или написать отзыв.",
}
