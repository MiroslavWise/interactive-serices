import Link from "next/link"

import { IconSpriteNavHeader } from "@/components/icons/icon-sprite-nav-header"

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
      <IconSpriteNavHeader id="sprite-nav-header-profile" />
    </div>
    <span>{TITLE}</span>
  </Link>
)
