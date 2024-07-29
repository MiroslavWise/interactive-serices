import Link from "next/link"

import { cx } from "@/lib/cx"
import { ITEMS_LINK_FOOTER } from "../constants"
import { MENU_ICONS } from "../../NavBar/constants/menu-icons"

import styles from "../styles/link.module.scss"

export const LinkMap = ({ pathname }: { pathname: string }) => {
  const isActive = pathname === ITEMS_LINK_FOOTER.map

  return (
    <Link
      href={{ pathname: ITEMS_LINK_FOOTER.map }}
      data-active={isActive}
      className={cx(styles.link, "h-full flex-[1] flex-shrink-0 flex pt-1 pb-[0.1875rem] px-[0.0625rem] flex-col no-underline relative")}
      data-test="link-footer-menu-mobile-map"
    >
      <section className="h-full flex flex-col items-center gap-[0.1875rem]">
        <article className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:h-6 *:w-6 *:-translate-x-1/2 *:-translate-y-1/2">
          {MENU_ICONS.map}
        </article>
        <p
          className={cx(
            "mt-auto justify-end text-center text-[0.6875rem] leading-[1.125rem] font-medium",
            isActive ? "text-text-accent" : "text-text-secondary",
          )}
        >
          Карта
        </p>
      </section>
    </Link>
  )
}
