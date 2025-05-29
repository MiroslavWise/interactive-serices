import Link from "next/link"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"

const TITLE = "Профиль"

export const LinkProfile = ({ pathname }: { pathname: string }) => (
  <Link
    key="::profile::link::"
    data-active={pathname.includes("/profile")}
    href="/profile"
    prefetch
    title={TITLE}
    aria-label={TITLE}
    aria-labelledby={TITLE}
  >
    <div className={cx(`w-6 h-6 relative *:w-6 *:h-6`, pathname.includes("/profile") ? "text-element-accent-1" : "text-text-primary")}>
      <IconSprite id="sprite-nav-header-profile" className="w-6 h-6" />
    </div>
    <span>{TITLE}</span>
  </Link>
)
