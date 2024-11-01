import Link from "next/link"

import { MENU_ICONS } from "../constants/menu-icons"

const TITLE = "Карта"

export const LinkMap = ({ pathname }: { pathname: string }) => (
  <Link
    href="/"
    data-active={typeof pathname === "string" && (!pathname || pathname === "/")}
    prefetch
    title={TITLE}
    aria-label={TITLE}
    aria-labelledby={TITLE}
  >
    {MENU_ICONS.map}
    <span>{TITLE}</span>
  </Link>
)
