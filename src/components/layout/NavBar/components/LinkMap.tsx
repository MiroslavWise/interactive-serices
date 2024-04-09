import { memo } from "react"
import { usePathname } from "next/navigation"

import LinkProgress from "@/components/common/LinkProgress"

import { MENU_ICONS } from "../constants/menu-icons"

export const LinkMap = memo(function LinkMap() {
  const pathname = usePathname()

  return (
    <LinkProgress href="/" data-active={typeof pathname === "string" && (!pathname || pathname === "/")}>
      {MENU_ICONS.map}
      <span>Карта</span>
    </LinkProgress>
  )
})
