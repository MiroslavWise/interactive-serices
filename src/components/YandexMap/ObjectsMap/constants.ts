import { EnumTypeProvider } from "@/types/enum"

export const TYPE_ICON: Record<EnumTypeProvider, string> = {
  [EnumTypeProvider.profile]: "",
  [EnumTypeProvider.offer]: "/map/droplet/offer.svg",
  [EnumTypeProvider.alert]: "/map/droplet/sos.svg",
  [EnumTypeProvider.discussion]: "/map/droplet/discussion.svg",
  [EnumTypeProvider.barter]: "",
  [EnumTypeProvider.threads]: "",
}
