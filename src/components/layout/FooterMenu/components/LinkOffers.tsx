import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { ITEMS_LINK_FOOTER } from "../constants"
import { getBarterUserIdReceiver } from "@/services"
import { useStatusAuth } from "@/helpers/use-status-auth"
import { useAuth, EStatusAuth, dispatchIntro } from "@/store"

import styles from "../styles/link.module.scss"

const TITLE = "О Sheira"

export const LinkOffers = ({ pathname }: { pathname: string }) => {
  const statusAuth = useStatusAuth()
  const { id } = useAuth(({ auth }) => auth) ?? {}
  const { data } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(id!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: id, status: EnumStatusBarter.INITIATED }],
    enabled: !!id && statusAuth === EStatusAuth.AUTHORIZED,
    refetchOnReconnect: true,
    refetchOnMount: true,
  })

  const isActive = pathname.includes(ITEMS_LINK_FOOTER.post)
  const count = data?.data?.length || 0

  return (
    <Link
      href={{}}
      data-active={isActive}
      className={cx(
        styles.link,
        "h-full flex-[1] flex-shrink-0 pt-1 pb-[0.1875rem] px-[0.0625rem] flex-col no-underline relative",
        statusAuth === EStatusAuth.AUTHORIZED ? "flex" : "hidden",
      )}
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        if (statusAuth === EStatusAuth.AUTHORIZED) {
          dispatchIntro(true)
        }
      }}
      data-test="link-footer-menu-mobile-offers"
      title={TITLE}
      aria-label={TITLE}
      aria-labelledby={TITLE}
    >
      <section className="h-full flex flex-col items-center gap-[0.1875rem]">
        <article className={cx("relative w-6 h-6 p-3 text-text-secondary")}>
          <IconSprite id="sprite-nav-header-about" className="w-6 h-6" />
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
