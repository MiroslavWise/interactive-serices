import Link from "next/link"

import { IconSpriteNavHeader } from "@/components/icons/icon-sprite-nav-header"

import { cx } from "@/lib/cx"
import { EStatusAuth } from "@/store"
import { useSign } from "../hooks/useSign"
import { ITEMS_LINK_FOOTER } from "../constants"
import { useStatusAuth } from "@/helpers/use-status-auth"

import styles from "../styles/link.module.scss"

export const LinkProfile = ({ pathname }: { pathname: string }) => {
  const handleAuthModal = useSign()
  const statusAuth = useStatusAuth()

  const isActive = pathname.includes(ITEMS_LINK_FOOTER.profile)

  const TITLE = statusAuth === EStatusAuth.AUTHORIZED ? "Профиль" : "Войти"

  return (
    <Link
      href={statusAuth === EStatusAuth.AUTHORIZED ? { pathname: ITEMS_LINK_FOOTER.profile } : {}}
      data-active={isActive}
      className={cx(styles.link, "h-full flex-[1] flex-shrink-0 flex pt-1 pb-[0.1875rem] px-[0.0625rem] flex-col no-underline relative")}
      onClick={(event) => {
        if (statusAuth !== EStatusAuth.AUTHORIZED) {
          event.stopPropagation()
          event.preventDefault()
          handleAuthModal()
        }
      }}
      data-test="link-footer-menu-mobile-profile"
      title={TITLE}
      aria-label={TITLE}
      aria-labelledby={TITLE}
    >
      <section className="h-full flex flex-col items-center gap-[0.1875rem]">
        <article className={cx(`w-6 h-6 relative *:w-6 *:h-6`, isActive ? "text-element-accent-1" : "text-element-grey")}>
          <IconSpriteNavHeader id="sprite-nav-header-profile" />
        </article>
        <p
          className={cx(
            "mt-auto justify-end text-center text-[0.6875rem] leading-[1.125rem] font-medium",
            isActive ? "text-text-accent" : "text-text-secondary",
          )}
        >
          {TITLE}
        </p>
      </section>
    </Link>
  )
}
