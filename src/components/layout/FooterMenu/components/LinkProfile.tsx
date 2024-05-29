import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { useAuth_ } from "@/store/hooks"
import { useSign } from "../hooks/useSign"
import { MENU_ICONS } from "../../NavBar/constants/menu-icons"
import { ITEMS_LINK_FOOTER } from "../constants"

import styles from "../styles/link.module.scss"

export const LinkProfile = memo(function LinkProfile() {
  const pathname = usePathname()
  const handleAuthModal = useSign()
  const isAuth = useAuth_(({ isAuth }) => isAuth)

  const isActive = pathname.includes(ITEMS_LINK_FOOTER.profile)

  return (
    <Link
      href={isAuth ? { pathname: ITEMS_LINK_FOOTER.profile } : {}}
      data-active={isActive}
      className={styles.link}
      onClick={(event) => {
        event.stopPropagation()
        if (!isAuth) {
          event.preventDefault()
          handleAuthModal()
        }
      }}
      data-test="link-footer-menu-mobile-profile"
    >
      <div className={styles.itemsIconLabel}>
        <article>{MENU_ICONS.profile}</article>
        <p>{isAuth ? "Профиль" : "Войти"}</p>
      </div>
    </Link>
  )
})
