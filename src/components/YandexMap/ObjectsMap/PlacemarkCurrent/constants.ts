import { EnumTypeProvider } from "@/types/enum"

export const TYPE_ICON: Record<EnumTypeProvider, { default: string; active: string }> = {
  [EnumTypeProvider.profile]: {
    default: "",
    active: "",
  },
  [EnumTypeProvider.request]: {
    default: "",
    active: "",
  },
  [EnumTypeProvider.offer]: {
    default: "",
    active: "",
  },
  [EnumTypeProvider.alert]: {
    default: "/map/circle-alert.png",
    active: "/map/default-alert-hover.png",
  },
  [EnumTypeProvider.discussion]: {
    default: "/map/circle-discussion.png",
    active: "/map/default-discussion-hover.png",
  },
  [EnumTypeProvider.barter]: {
    default: "",
    active: "",
  },
  [EnumTypeProvider.threads]: {
    default: "",
    active: "",
  },
}
