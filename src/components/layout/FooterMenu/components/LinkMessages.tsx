import Link from "next/link"

import { useAuth } from "@/store/hooks"
import { useSign } from "../hooks/useSign"
import { ITEMS_LINK_FOOTER } from "../constants"
import { useCountMessagesNotReading } from "@/helpers"
import { MENU_ICONS } from "../../NavBar/constants/menu-icons"

import styles from "../styles/link.module.scss"

export const LinkMessages = ({ pathname }: { pathname: string }) => {
  const handleAuthModal = useSign()
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const { count } = useCountMessagesNotReading()

  const isActive = pathname?.includes(ITEMS_LINK_FOOTER.chat)

  return (
    <Link
      href={isAuth ? { pathname: ITEMS_LINK_FOOTER.chat } : {}}
      data-active={isActive}
      className={styles.link}
      onClick={(event) => {
        event.stopPropagation()
        if (!isAuth) {
          event.preventDefault()
          handleAuthModal()
        }
      }}
      data-test="link-footer-menu-mobile-messages"
    >
      <div className={styles.itemsIconLabel}>
        <article>{MENU_ICONS.message}</article>
        <p>Сообщения</p>
      </div>
      {count ? (
        <div data-count>
          <span>{count > 9 ? "9+" : count || 0}</span>
        </div>
      ) : null}
    </Link>
  )
}
