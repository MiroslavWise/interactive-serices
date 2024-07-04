import Link from "next/link"

import { MENU_ICONS } from "../constants/menu-icons"

export const LinkProfile = ({ pathname }: { pathname: string }) => (
  <Link key="::profile::link::" data-active={pathname?.includes("/profile")} href="/profile" prefetch>
    {MENU_ICONS.profile}
    <span>Профиль</span>
  </Link>
)
