import { EnumTypeProvider } from "@/types/enum"

export const TYPE_ICON: Record<EnumTypeProvider, { default: string; active: string }> = {
  [EnumTypeProvider.profile]: {
    default: "",
    active: "",
  },
  [EnumTypeProvider.offer]: {
    default: "/map/droplet/offer.svg",
    active: "/map/droplet/offer.svg",
  },
  [EnumTypeProvider.alert]: {
    default: "/map/droplet/sos.svg",
    active: "/map/droplet/sos.svg",
  },
  [EnumTypeProvider.discussion]: {
    default: "/map/droplet/discussion.svg",
    active: "/map/droplet/discussion.svg",
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
