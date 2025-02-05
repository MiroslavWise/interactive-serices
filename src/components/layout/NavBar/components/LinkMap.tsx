import Link from "next/link"

import { IconSpriteNavHeader } from "@/components/icons/icon-sprite-nav-header"

import { cx } from "@/lib/cx"

const TITLE = "Карта"

export const LinkMap = ({ pathname }: { pathname: string }) => {
  const is = typeof pathname === "string" && (!pathname || pathname === "/")

  return (
    <Link href="/" data-active={is} prefetch title={TITLE} aria-label={TITLE} aria-labelledby={TITLE} className={cx()}>
      <div className={cx(`w-6 h-6 relative *:w-6 *:h-6`, is ? "text-element-accent-1" : "text-element-grey")}>
        <IconSpriteNavHeader id="sprite-nav-header-map" />
      </div>
      <span>{TITLE}</span>
    </Link>
  )
}
