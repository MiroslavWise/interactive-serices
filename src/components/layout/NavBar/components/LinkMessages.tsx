import Link from "next/link"
import { memo, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store/hooks"
import { serviceThreads } from "@/services/threads"

export const LinkMessages = memo(function LinkOffers() {
    const userId = useAuth(({ userId }) => userId)
    const pathname = usePathname()
    const { data } = useQuery({
        queryFn: () =>
            serviceThreads.get({
                user: userId!,
                order: "DESC",
                messagesLimit: 1,
                messagesOrder: "DESC",
            }),
        queryKey: ["threads", `user=${userId}`],
        refetchOnMount: true,
    })

    useEffect(() => {
        console.log("data LinkMessages: ", data?.res)
    }, [data?.res])

    return (
        <Link key="::messages::link::" data-active={pathname?.includes("/messages")} href={{ pathname: "/messages" }}>
            <img src="/icons/mobile/fill/message-filled.svg" alt="messages" width={24} height={24} />
            <span>Сообщения</span>
        </Link>
    )
})
