import { Logo } from "./components/Logo"
import { useParams, usePathname } from "next/navigation"
import { NotificationBell } from "./components/NotificationBell"

import { useMobileSearchCategory, useSearchMobile } from "@/store"

import styles from "./styles/styles.module.scss"

export default function MobileHeader() {
  const visibleSearchMobile = useSearchMobile(({ visible }) => visible)
  const visibleSearchCategory = useMobileSearchCategory(({ visible }) => visible)
  const pathname = usePathname()
  const params = useParams()

  const { id } = params ?? {}

  const isNotHeader =
    visibleSearchCategory || visibleSearchMobile || pathname.includes("/customer/") || (pathname.includes("/chat") && !!id)

  return (
    <header className={styles.header} data-test="header-mobile" data-not={isNotHeader}>
      <Logo />
      <NotificationBell />
    </header>
  )
}
