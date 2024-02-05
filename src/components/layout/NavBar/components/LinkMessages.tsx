import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { MENU_ICONS } from "../constants/menu-icons"
import { useCountMessagesNotReading } from "@/helpers"

export const LinkMessages = memo(function LinkOffers() {
    const { count } = useCountMessagesNotReading()
    const pathname = usePathname()

    return (
        <Link key="::messages::link::" data-active={pathname?.includes("/messages")} href={{ pathname: "/messages" }}>
            {MENU_ICONS.message}
            <span>Сообщения</span>
            {count ? (
                <div data-count>
                    <span>{count > 9 ? "9+" : count || 0}</span>
                </div>
            ) : null}
        </Link>
    )
})
