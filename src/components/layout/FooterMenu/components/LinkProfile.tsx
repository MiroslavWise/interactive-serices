import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { useAuth } from "@/store/hooks"
import { useSign } from "../hooks/useSign"
import { ITEMS_LINK_FOOTER, ITEMS_LINK_ICON } from "../constants"

import styles from "../styles/link.module.scss"

export const LinkProfile = memo(function LinkProfile() {
    const pathname = usePathname()
    const handleAuthModal = useSign()
    const isAuth = useAuth(({ isAuth }) => isAuth)

    const isActive = pathname === ITEMS_LINK_FOOTER.profile

    return (
        <Link
            href={isAuth ? { pathname: ITEMS_LINK_FOOTER.profile } : {}}
            data-active={isActive}
            className={styles.link}
            onClick={(event) => {
                event.stopPropagation()
                handleAuthModal()
            }}
        >
            <div className={styles.itemsIconLabel}>
                {isActive ? ITEMS_LINK_ICON.profile.active : ITEMS_LINK_ICON.profile["not-active"]}
                <p>{isAuth ? "Профиль" : "Войти"}</p>
            </div>
        </Link>
    )
})
