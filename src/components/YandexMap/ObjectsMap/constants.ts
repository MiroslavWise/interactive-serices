import { EnumTypeProvider } from "@/types/enum"

export const TYPE_ICON = {
  [EnumTypeProvider.offer]: "/map/droplet/offer.svg",
  [EnumTypeProvider.alert]: "/map/droplet/sos.svg",
  [EnumTypeProvider.discussion]: "/map/droplet/discussion.svg",
} as Record<EnumTypeProvider, string>

export const TYPE_ICON_URGENT = {
  [EnumTypeProvider.offer]: "/map/droplet/offer_urgent.svg",
  [EnumTypeProvider.alert]: "/map/droplet/alert_urgent.svg",
  [EnumTypeProvider.discussion]: "/map/droplet/discussion_urgent.svg",
} as Record<EnumTypeProvider, string>
