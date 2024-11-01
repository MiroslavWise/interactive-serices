import Link from "next/link"

import { MENU_ICONS } from "../constants/menu-icons"

const TITLE = "Профиль"

export const LinkProfile = ({ pathname }: { pathname: string }) => (
  <Link
    key="::profile::link::"
    data-active={pathname?.includes("/profile")}
    href="/profile"
    prefetch
    title={TITLE}
    aria-label={TITLE}
    aria-labelledby={TITLE}
  >
    {MENU_ICONS.profile}
    <span>{TITLE}</span>
  </Link>
)
