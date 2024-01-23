import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store"
import { useSign } from "../hooks/useSign"
import { serviceBarters } from "@/services"
import { ITEMS_LINK_FOOTER, ITEMS_LINK_ICON } from "../constants"

import styles from "../styles/link.module.scss"

export const LinkOffers = memo(function LinkOffers() {
    const pathname = usePathname()
    const handleAuthModal = useSign()
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const userId = useAuth(({ userId }) => userId)
    const { data } = useQuery({
        queryFn: () =>
            serviceBarters.getReceiverId(userId!, {
                status: "initiated",
                order: "DESC",
            }),
        queryKey: ["barters", { receiver: userId, status: "initiated" }],
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
                {isActive ? ITEMS_LINK_ICON.offers.active : ITEMS_LINK_ICON.offers["not-active"]}
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
