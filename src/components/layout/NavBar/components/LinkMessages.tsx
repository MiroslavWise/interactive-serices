import Link from "next/link"

import { IconSpriteNavHeader } from "@/components/icons/icon-sprite-nav-header"

import { cx } from "@/lib/cx"
import { useCountMessagesNotReading } from "@/helpers"

const TITLE = "Сообщения"

export const LinkMessages = ({ pathname }: { pathname: string }) => {
  const { count } = useCountMessagesNotReading()

  const is = pathname?.includes("/chat")

  return (
    <Link key="::messages::link::" data-active={is} title={TITLE} aria-label={TITLE} aria-labelledby={TITLE} href={{ pathname: "/chat" }}>
      <div className={cx(`w-6 h-6 relative *:w-6 *:h-6`, is ? "text-element-accent-1" : "text-element-grey")}>
        <IconSpriteNavHeader id="sprite-nav-header-message" />
      </div>
      <span>{TITLE}</span>
      {count ? (
        <div data-count>
          <span>{count > 9 ? "9+" : count || 0}</span>
        </div>
      ) : null}
    </Link>
  )
}
