import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { MENU_ICONS } from "../constants/menu-icons"

export const LinkMap = memo(function LinkMap() {
  const pathname = usePathname()

  return (
    <Link href={{ pathname: "/" }} data-active={typeof pathname === "string" && (!pathname || pathname === "/")}>
      {MENU_ICONS.map}
      <span>Карта</span>
    </Link>
  )
})
