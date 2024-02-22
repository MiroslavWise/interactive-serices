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
  const userId = useAuth(({ userId }) => userId)
  const { data } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
    enabled: !!userId && isAuth,
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
        handleAuthModal()
      }}
    >
      <div className={styles.itemsIconLabel}>
        {MENU_ICONS.offers}
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
