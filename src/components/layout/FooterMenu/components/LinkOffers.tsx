import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { useAuth } from "@/store"
import { useSign } from "../hooks/useSign"
import { ITEMS_LINK_FOOTER } from "../constants"
import { getBarterUserIdReceiver } from "@/services"
import { MENU_ICONS } from "../../NavBar/constants/menu-icons"

import styles from "../styles/link.module.scss"

export const LinkOffers = memo(function LinkOffers() {
  const pathname = usePathname()
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

  return (
    <Link
      href={isAuth ? { pathname: ITEMS_LINK_FOOTER.offers } : {}}
      data-active={isActive}
      className={styles.link}
      onClick={(event) => {
        event.stopPropagation()
        if (!isAuth) {
          event.preventDefault()
          handleAuthModal()
        }
      }}
      data-test="link-footer-menu-mobile-offers"
    >
      <div className={styles.itemsIconLabel}>
        <article>{MENU_ICONS.offers}</article>
        <p>Обмен</p>
      </div>
      {data?.res?.length ? (
        <div data-count>
          <span>{data?.res?.length > 9 ? "9+" : data?.res?.length || 0}</span>
        </div>
      ) : null}
    </Link>
  )
})
