import Link from "next/link"

import { MENU_ICONS } from "../constants/menu-icons"
import { useCountMessagesNotReading } from "@/helpers"

export const LinkMessages = ({ pathname }: { pathname: string }) => {
  const { count } = useCountMessagesNotReading()

  return (
    <Link key="::messages::link::" data-active={pathname?.includes("/messages")} href="/messages" prefetch>
      {MENU_ICONS.message}
      <span>Сообщения</span>
      {count ? (
        <div data-count>
          <span>{count > 9 ? "9+" : count || 0}</span>
        </div>
      ) : null}
    </Link>
  )
}
