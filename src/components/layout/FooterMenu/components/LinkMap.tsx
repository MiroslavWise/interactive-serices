import Link from "next/link"
import { memo, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { ITEMS_LINK_FOOTER, ITEMS_LINK_ICON } from "../constants"

import styles from "../styles/link.module.scss"
import { useAuth } from "@/store"
import { serviceNotifications } from "@/services"
import { useQuery } from "@tanstack/react-query"

export const LinkMap = memo(function LinkMap() {
    const pathname = usePathname()
    const [count, setCount] = useState<number | null>(null)
    const userId = useAuth(({ userId }) => userId)

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
        <Link href={{ pathname: ITEMS_LINK_FOOTER.map }} data-active={isActive} className={styles.link}>
            <div className={styles.itemsIconLabel}>
                {isActive ? ITEMS_LINK_ICON.map.active : ITEMS_LINK_ICON.map["not-active"]}
                <p>Карта</p>
            </div>
            {count ? (
                <div data-count>
                    <span>{count > 9 ? "9+" : count || 0}</span>
                </div>
            ) : null}
        </Link>
    )
})
