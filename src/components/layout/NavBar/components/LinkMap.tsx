import Link from "next/link"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"

const TITLE = "Карта"

export const LinkMap = ({ pathname }: { pathname: string }) => {
  const is = typeof pathname === "string" && (!pathname || pathname === "/")

  return (
    <Link href="/" data-active={is} prefetch title={TITLE} aria-label={TITLE} aria-labelledby={TITLE} className={cx()}>
      <div className={cx(`w-6 h-6 relative`, is ? "text-element-accent-1" : "text-text-primary")}>
        <IconSprite id="sprite-nav-header-map" className="w-6 h-6" />
      </div>
      <span>{TITLE}</span>
    </Link>
  )
}
