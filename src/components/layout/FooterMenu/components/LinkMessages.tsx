import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { useAuth } from "@/store/hooks"
import { useSign } from "../hooks/useSign"
import { useCountMessagesNotReading } from "@/helpers"
import { ITEMS_LINK_FOOTER, ITEMS_LINK_ICON } from "../constants"

import styles from "../styles/link.module.scss"

export const LinkMessages = memo(function LinkMessages() {
    const pathname = usePathname()
    const handleAuthModal = useSign()
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const { count } = useCountMessagesNotReading()

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
            {count ? (
                <div data-count>
                    <span>{count > 9 ? "9+" : count || 0}</span>
                </div>
            ) : null}
        </Link>
    )
})
