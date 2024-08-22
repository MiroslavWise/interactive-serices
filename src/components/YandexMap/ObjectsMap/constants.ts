import { EnumTypeProvider } from "@/types/enum"

export const TYPE_ICON = {
  [EnumTypeProvider.offer]: "/map/droplet/offer.webp",
  [EnumTypeProvider.alert]: "/map/droplet/sos.webp",
  [EnumTypeProvider.discussion]: "/map/droplet/discussion.webp",
} as Record<EnumTypeProvider, string>

export const TYPE_ICON_URGENT = {
  [EnumTypeProvider.offer]: "/map/droplet/offer_urgent.webp",
  [EnumTypeProvider.alert]: "/map/droplet/alert_urgent.webp",
  [EnumTypeProvider.discussion]: "/map/droplet/discussion_urgent.webp",
} as Record<EnumTypeProvider, string>
