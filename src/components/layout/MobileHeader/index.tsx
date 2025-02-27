"use client"

import { usePathname } from "next/navigation"
import { parseAsInteger, useQueryState } from "nuqs"

import { Logo } from "./components/Logo"
import { IconSprite } from "@/components/icons/icon-sprite"
import { NotificationBell } from "./components/NotificationBell"

import { cx } from "@/lib/cx"
import { QUERY_CHAT_MESSAGES } from "@/types/constants"
import { dispatchOpenDrawer, useMobileSearchCategory, useSearchMobile } from "@/store"

export default function MobileHeader() {
  const visibleSearchMobile = useSearchMobile(({ visible }) => visible)
  const visibleSearchCategory = useMobileSearchCategory(({ visible }) => visible)
  const pathname = usePathname()
  const [id] = useQueryState(QUERY_CHAT_MESSAGES, parseAsInteger)

  const isNotHeader =
    visibleSearchCategory ||
    visibleSearchMobile ||
    pathname.includes("/customer/") ||
    (pathname.includes("/chat") && typeof id === "number")

  return (
    <header
      className={cx(
        "w-full left-0 right-0 h-[var(--height-mobile-header)] fixed z-[71] bg-BG-second items-center justify-between px-5 py-2.5 flex md:hidden top-0",
        isNotHeader && "!-translate-y-full opacity-0 invisible",
      )}
      data-test="header-mobile"
    >
      <Logo />
      <div className="flex items-center gap-2">
        <NotificationBell />
        <button type="button" className="relative w-6 h-6" onClick={dispatchOpenDrawer}>
          <IconSprite id="sprite-nav-header-burger-menu" className="w-8 h-8 text-element-accent-1" />
        </button>
      </div>
    </header>
  )
}
