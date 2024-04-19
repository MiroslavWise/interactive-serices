import { memo } from "react"
import { usePathname } from "next/navigation"

import LinkProgress from "@/components/common/LinkProgress"

import { MENU_ICONS } from "../constants/menu-icons"

export const LinkProfile = memo(function LinkProfile() {
  const pathname = usePathname()

  return (
    <LinkProgress key="::profile::link::" data-active={pathname?.includes("/profile")} href="/profile">
      {MENU_ICONS.profile}
      <span>Профиль</span>
    </LinkProgress>
  )
})
