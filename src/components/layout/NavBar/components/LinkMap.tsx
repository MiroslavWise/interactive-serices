import Link from "next/link"

import { MENU_ICONS } from "../constants/menu-icons"

export const LinkMap = ({ pathname }: { pathname: string }) => (
  <Link href="/" data-active={typeof pathname === "string" && (!pathname || pathname === "/")}>
    {MENU_ICONS.map}
    <span>Карта</span>
  </Link>
)
