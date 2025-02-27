import Link from "next/link"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { ITEMS_LINK_FOOTER } from "../constants"
import { dispatchIntro, EStatusAuth } from "@/store"
import { useStatusAuth } from "@/helpers/use-status-auth"

import styles from "../styles/link.module.scss"

export const LinkMap = ({ pathname }: { pathname: string }) => {
  const statusAuth = useStatusAuth()
  const isActive = pathname === ITEMS_LINK_FOOTER.map && statusAuth === EStatusAuth.AUTHORIZED

  const TITLE = statusAuth === EStatusAuth.AUTHORIZED ? "Карта" : "О Sheira"

  return (
    <Link
      href={{ pathname: ITEMS_LINK_FOOTER.map }}
      data-active={isActive}
      className={cx(styles.link, "h-full flex-[1] flex-shrink-0 pt-1 pb-[0.1875rem] px-[0.0625rem] flex-col no-underline relative")}
      data-test="link-footer-menu-mobile-map"
      onClick={(event) => {
        if (statusAuth !== EStatusAuth.AUTHORIZED) {
          event.stopPropagation()
          event.preventDefault()
          dispatchIntro(true)
        }
      }}
      title={TITLE}
      aria-label={TITLE}
      aria-labelledby={TITLE}
    >
      <section className="h-full flex flex-col items-center gap-[0.1875rem]">
        <article className={cx("relative w-6 h-6 p-3 *:h-6 *:w-6", isActive ? "text-text-accent" : "text-text-secondary")}>
          <IconSprite id={`sprite-nav-header-${statusAuth === EStatusAuth.AUTHORIZED ? "map" : "about"}`} />
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
