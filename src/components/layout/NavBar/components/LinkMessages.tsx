import Link from "next/link"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { useCountMessagesNotReading } from "@/helpers"

const TITLE = "Сообщения"

export const LinkMessages = ({ pathname }: { pathname: string }) => {
  const { count } = useCountMessagesNotReading()

  const is = pathname?.includes("/chat")

  return (
    <Link key="::messages::link::" data-active={is} title={TITLE} aria-label={TITLE} aria-labelledby={TITLE} href={{ pathname: "/chat" }}>
      <div className={cx(`w-6 h-6 relative`, is ? "text-element-accent-1" : "text-text-primary")}>
        <IconSprite id="sprite-nav-header-message" className="w-6 h-6" />
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
