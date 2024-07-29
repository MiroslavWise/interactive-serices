import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useSign } from "../hooks/useSign"
import { ITEMS_LINK_FOOTER } from "../constants"
import { getBarterUserIdReceiver } from "@/services"
import { MENU_ICONS } from "../../NavBar/constants/menu-icons"

import styles from "../styles/link.module.scss"

export const LinkOffers = ({ pathname }: { pathname: string }) => {
  const handleAuthModal = useSign()
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const { id } = useAuth(({ auth }) => auth) ?? {}
  const { data } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(id!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: id, status: EnumStatusBarter.INITIATED }],
    enabled: !!id && isAuth,
    refetchOnReconnect: true,
    refetchOnMount: true,
  })

  const isActive = pathname.includes(ITEMS_LINK_FOOTER.offers)
  const count = data?.res?.length || 0

  return (
    <Link
      href={isAuth ? { pathname: ITEMS_LINK_FOOTER.offers } : {}}
      data-active={isActive}
      className={cx(styles.link, "h-full flex-[1] flex-shrink-0 flex pt-1 pb-[0.1875rem] px-[0.0625rem] flex-col no-underline relative")}
      onClick={(event) => {
        event.stopPropagation()
        if (!isAuth) {
          event.preventDefault()
          handleAuthModal()
        }
      }}
      data-test="link-footer-menu-mobile-offers"
    >
      <section className="h-full flex flex-col items-center gap-[0.1875rem]">
        <article className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:h-6 *:w-6 *:-translate-x-1/2 *:-translate-y-1/2">
          {MENU_ICONS.offers}
        </article>
        <p
          className={cx(
            "mt-auto justify-end text-center text-[0.6875rem] leading-[1.125rem] font-medium",
            isActive ? "text-text-accent" : "text-text-secondary",
          )}
        >
          Обмен
        </p>
      </section>

      <div
        className={cx(
          "absolute top-[0.35rem] left-[calc(50%_+_0.125rem)] h-[1.1375rem] min-w-[1.1375rem] w-min justify-center items-center px-[0.4rem] bg-element-accent-1 rounded-[0.56875rem]",
          count ? "inline-flex opacity-100" : "opacity-0 hidden",
        )}
      >
        <span className="text-text-button text-center text-[0.575rem] leading-[0.575rem] font-semibold">
          {Number(count) > 9 ? "9+" : count || 0}
        </span>
      </div>
    </Link>
  )
}
