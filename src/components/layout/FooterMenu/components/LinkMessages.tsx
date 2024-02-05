import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { useAuth } from "@/store/hooks"
import { useSign } from "../hooks/useSign"
import { ITEMS_LINK_FOOTER } from "../constants"
import { useCountMessagesNotReading } from "@/helpers"
import { MENU_ICONS } from "../../NavBar/constants/menu-icons"

import styles from "../styles/link.module.scss"

export const LinkMessages = memo(function LinkMessages() {
    const pathname = usePathname()
    const handleAuthModal = useSign()
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const { count } = useCountMessagesNotReading()

    const isActive = pathname?.includes(ITEMS_LINK_FOOTER.messages)

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
                {MENU_ICONS.message}
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
