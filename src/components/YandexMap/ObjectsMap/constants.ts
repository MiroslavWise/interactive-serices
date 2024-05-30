import { EnumTypeProvider } from "@/types/enum"

export const TYPE_ICON: Record<EnumTypeProvider, { default: string; active: string }> = {
  [EnumTypeProvider.profile]: {
    default: "",
    active: "",
  },
  [EnumTypeProvider.offer]: {
    default: "/map/droplet/offer.png",
    active: "/map/droplet/offer.png",
  },
  [EnumTypeProvider.alert]: {
    default: "/map/droplet/sos.png",
    active: "/map/droplet/sos.png",
  },
  [EnumTypeProvider.discussion]: {
    default: "/map/droplet/discussion.png",
    active: "/map/droplet/discussion.png",
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
