import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store"
import { serviceBarters } from "@/services"

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
            <img src="/icons/mobile/fill/sharing-filled.svg" alt="offers" width={24} height={24} />
            <span>Предложения обменов</span>
            {data?.res?.length ? (
                <div data-count>
                    <span>{data?.res?.length > 9 ? "9+" : data?.res?.length || 0}</span>
                </div>
            ) : null}
        </Link>
    )
})
