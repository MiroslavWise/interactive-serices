import Link from "next/link"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useSign } from "../hooks/useSign"
import { ITEMS_LINK_FOOTER } from "../constants"
import { MENU_ICONS } from "../../NavBar/constants/menu-icons"

import styles from "../styles/link.module.scss"

export const LinkProfile = ({ pathname }: { pathname: string }) => {
  const handleAuthModal = useSign()
  const isAuth = useAuth(({ isAuth }) => isAuth)

  const isActive = pathname.includes(ITEMS_LINK_FOOTER.profile)

  return (
    <Link
      href={isAuth ? { pathname: ITEMS_LINK_FOOTER.profile } : {}}
      data-active={isActive}
      className={cx(styles.link, "h-full flex-[1] flex-shrink-0 flex pt-1 pb-[0.1875rem] px-[0.0625rem] flex-col no-underline relative")}
      onClick={(event) => {
        event.stopPropagation()
        if (!isAuth) {
          event.preventDefault()
          handleAuthModal()
        }
      }}
      data-test="link-footer-menu-mobile-profile"
    >
      <section className="h-full flex flex-col items-center gap-[0.1875rem]">
        <article className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:h-6 *:w-6 *:-translate-x-1/2 *:-translate-y-1/2">
          {MENU_ICONS.profile}
        </article>
        <p
          className={cx(
            "mt-auto justify-end text-center text-[0.6875rem] leading-[1.125rem] font-medium",
            isActive ? "text-text-accent" : "text-text-secondary",
          )}
        >
          {isAuth ? "Профиль" : "Войти"}
        </p>
      </section>
    </Link>
  )
}
