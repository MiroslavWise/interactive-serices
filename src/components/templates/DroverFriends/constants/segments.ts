import type { ISegmentValues } from "@/components/common/Segments/types"
import type { TTypeFriends } from "@/store/types/createDroverFriends"

export const SEGMENT_FRIENDS: ISegmentValues<TTypeFriends>[] = [
  {
    label: "Друзья",
    value: "list",
  },
  {
    label: "Запросы",
    value: "response",
  },
  {
    label: "Заявки",
    value: "request",
  },
]
