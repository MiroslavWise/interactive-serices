import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { useCountMessagesNotReading } from "@/helpers"

export const LinkMessages = memo(function LinkOffers() {
    const { count } = useCountMessagesNotReading()
    const pathname = usePathname()

    return (
        <Link key="::messages::link::" data-active={pathname?.includes("/messages")} href={{ pathname: "/messages" }}>
            <img src="/icons/mobile/fill/message-filled.svg" alt="messages" width={24} height={24} />
            <span>Сообщения</span>
            {count ? (
                <div data-count>
                    <span>{count > 9 ? "9+" : count || 0}</span>
                </div>
            ) : null}
        </Link>
    )
})
