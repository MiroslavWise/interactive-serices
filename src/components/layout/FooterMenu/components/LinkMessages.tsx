import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { useAuth } from "@/store/hooks"
import { useSign } from "../hooks/useSign"
import { ITEMS_LINK_FOOTER, ITEMS_LINK_ICON } from "../constants"

import styles from "../styles/link.module.scss"

export const LinkMessages = memo(function LinkMessages() {
    const pathname = usePathname()
    const handleAuthModal = useSign()
    const isAuth = useAuth(({ isAuth }) => isAuth)

    const isActive = pathname === ITEMS_LINK_FOOTER.messages

    return (
        <Link
            href={isAuth ? { pathname: ITEMS_LINK_FOOTER.messages } : {}}
            data-active={isActive}
            className={styles.link}
            onClick={(event) => {
                event.stopPropagation()
                handleAuthModal()
            }}
        >
            <div className={styles.itemsIconLabel}>
                {isActive ? ITEMS_LINK_ICON.messages.active : ITEMS_LINK_ICON.messages["not-active"]}
                <p>Сообщения</p>
            </div>
        </Link>
    )
})
