type TTypeFooterLink = "/" | "/offers" | "/messages" | "/profile"
type TTypeEnumLink = "map" | "offers" | "messages" | "profile"

export const ITEMS_LINK_FOOTER: Record<TTypeEnumLink, TTypeFooterLink> = {
    map: "/",
    offers: "/offers",
    messages: "/messages",
    profile: "/profile",
}
