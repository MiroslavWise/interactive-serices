import { EnumTypeProvider } from "@/types/enum"

export const TYPE_ICON = {
  [EnumTypeProvider.offer]: "/map/droplet/offer.avif",
  [EnumTypeProvider.alert]: "/map/droplet/sos.avif",
  [EnumTypeProvider.discussion]: "/map/droplet/discussion.avif",
} as Record<EnumTypeProvider, string>

export const TYPE_ICON_URGENT = {
  [EnumTypeProvider.offer]: "/map/droplet/offer_urgent.avif",
  [EnumTypeProvider.alert]: "/map/droplet/alert_urgent.avif",
  [EnumTypeProvider.discussion]: "/map/droplet/discussion_urgent.avif",
} as Record<EnumTypeProvider, string>
