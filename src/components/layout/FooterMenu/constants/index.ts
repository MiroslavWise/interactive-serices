import { EnumTypeProvider } from "@/types/enum"

type TTypeFooterLink = "/" | `/profile?type=${EnumTypeProvider.POST}` | "/chat" | "/profile"
type TTypeEnumLink = "map" | "post" | "chat" | "profile"

export const ITEMS_LINK_FOOTER: Record<TTypeEnumLink, TTypeFooterLink> = {
  map: "/",
  post: `/profile?type=${EnumTypeProvider.POST}`,
  chat: "/chat",
  profile: "/profile",
}
