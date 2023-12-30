import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

export const LinkProfile = memo(function LinkProfile() {
    const pathname = usePathname()

    return (
        <Link key="::profile::link::" data-active={pathname?.includes("/profile")} href={{ pathname: "/profile" }}>
            <img src="/icons/mobile/fill/profile-active-filled.svg" alt="profile" width={24} height={24} />
            <span>Профиль</span>
        </Link>
    )
})
