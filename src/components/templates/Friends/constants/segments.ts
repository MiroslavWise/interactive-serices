export type TFriends = "all" | "mutual"

interface I {
  value: TFriends
  label: string
}

export const SEGMENT_FRIENDS: I[] = [
  {
    value: "all",
    label: "Все друзья",
  },
  {
    value: "mutual",
    label: "Общие друзья",
  },
]
