import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store"
import { serviceBarters } from "@/services"
import { MENU_ICONS } from "../constants/menu-icons"

export const LinkOffers = memo(function LinkOffers() {
    const pathname = usePathname()
    const userId = useAuth(({ userId }) => userId)
    const { data } = useQuery({
        queryFn: () =>
            serviceBarters.getReceiverId(userId!, {
                status: "initiated",
                order: "DESC",
            }),
        queryKey: ["barters", { receiver: userId, status: "initiated" }],
        refetchOnReconnect: true,
        refetchOnMount: true,
    })

    return (
        <Link key="::offers::link::" data-active={pathname?.includes("/offers")} href={{ pathname: "/offers" }}>
            {MENU_ICONS.offers}
            <span>Предложения обменов</span>
            {data?.res?.length ? (
                <div data-count>
                    <span>{data?.res?.length > 9 ? "9+" : data?.res?.length || 0}</span>
                </div>
            ) : null}
        </Link>
    )
})
