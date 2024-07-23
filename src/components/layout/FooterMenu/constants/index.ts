type TTypeFooterLink = "/" | "/offers" | "/chat" | "/profile"
type TTypeEnumLink = "map" | "offers" | "chat" | "profile"

export const ITEMS_LINK_FOOTER: Record<TTypeEnumLink, TTypeFooterLink> = {
  map: "/",
  offers: "/offers",
  chat: "/chat",
  profile: "/profile",
}
