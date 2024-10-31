import Link from "next/link"

import { MENU_ICONS } from "../constants/menu-icons"
import { useCountMessagesNotReading } from "@/helpers"

const TITLE = "Сообщения"

export const LinkMessages = ({ pathname }: { pathname: string }) => {
  const { count } = useCountMessagesNotReading()

  return (
    <Link
      key="::messages::link::"
      data-active={pathname?.includes("/chat")}
      href="/chat"
      prefetch
      title={TITLE}
      aria-label={TITLE}
      aria-labelledby={TITLE}
    >
      {MENU_ICONS.message}
      <span>{TITLE}</span>
      {count ? (
        <div data-count>
          <span>{count > 9 ? "9+" : count || 0}</span>
        </div>
      ) : null}
    </Link>
  )
}
