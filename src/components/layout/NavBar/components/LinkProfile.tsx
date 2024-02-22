import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { MENU_ICONS } from "../constants/menu-icons"

export const LinkProfile = memo(function LinkProfile() {
    const pathname = usePathname()

    return (
        <Link key="::profile::link::" data-active={pathname?.includes("/profile")} href={{ pathname: "/profile" }}>
            {MENU_ICONS.profile}
            <span>Профиль</span>
        </Link>
    )
})
