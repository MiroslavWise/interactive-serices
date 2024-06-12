import { usePathname } from "next/navigation"

import LinkProgress from "@/components/common/LinkProgress"

import { MENU_ICONS } from "../constants/menu-icons"
import { useCountMessagesNotReading } from "@/helpers"

export function LinkMessages() {
  const { count } = useCountMessagesNotReading()
  const pathname = usePathname()

  return (
    <LinkProgress key="::messages::link::" data-active={pathname?.includes("/messages")} href="/messages">
      {MENU_ICONS.message}
      <span>Сообщения</span>
      {count ? (
        <div data-count>
          <span>{count > 9 ? "9+" : count || 0}</span>
        </div>
      ) : null}
    </LinkProgress>
  )
}
