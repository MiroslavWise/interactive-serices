import { Logo } from "./components/Logo"
import { useParams, usePathname } from "next/navigation"
import { NotificationBell } from "./components/NotificationBell"

import { cx } from "@/lib/cx"
import { useMobileSearchCategory, useSearchMobile } from "@/store"

export default function MobileHeader() {
  const visibleSearchMobile = useSearchMobile(({ visible }) => visible)
  const visibleSearchCategory = useMobileSearchCategory(({ visible }) => visible)
  const pathname = usePathname()
  const params = useParams()

  const { id } = params ?? {}

  const isNotHeader =
    visibleSearchCategory || visibleSearchMobile || pathname.includes("/customer/") || (pathname.includes("/chat") && !!id)

  return (
    <header
      className={cx(
        "w-full left-0 right-0 h-[var(--height-mobile-header)] fixed z-[71] bg-BG-second items-center justify-between px-5 py-2.5 flex md:hidden",
        // pathname === "/" && visibleBanner
        //   ? `top-16 ${isNotHeader ? "!-translate-y-[calc(100%_+_var(--height-banner))]" : ""}`
        //   :
        `top-0 ${isNotHeader ? "!-translate-y-full" : ""}`,
      )}
      data-test="header-mobile"
      data-not={isNotHeader}
    >
      <Logo />
      <NotificationBell />
    </header>
  )
}
