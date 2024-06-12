import Link from "next/link"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { memo, useEffect, useState } from "react"

import { useAuth } from "@/store"
import { serviceNotifications } from "@/services"
import { ITEMS_LINK_FOOTER } from "../constants"
import { MENU_ICONS } from "../../NavBar/constants/menu-icons"

import styles from "../styles/link.module.scss"

export const LinkMap = () => {
  const pathname = usePathname()
  const [count, setCount] = useState<number | null>(null)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: !!userId,
  })

  useEffect(() => {
    if (data?.res && data?.res?.length > 0) {
      let count = 0
      for (const item of data?.res) {
        if (!item.read) {
          count += 1
        }
      }
      setCount(count || null)
    }
  }, [data?.res])

  const isActive = pathname === ITEMS_LINK_FOOTER.map

  return (
    <Link href={{ pathname: ITEMS_LINK_FOOTER.map }} data-active={isActive} className={styles.link} data-test="link-footer-menu-mobile-map">
      <div className={styles.itemsIconLabel}>
        <article>{MENU_ICONS.map}</article>
        <p>Карта</p>
      </div>
      {count ? (
        <div data-count>
          <span>{count > 9 ? "9+" : count || 0}</span>
        </div>
      ) : null}
    </Link>
  )
}
