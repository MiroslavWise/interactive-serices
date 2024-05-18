import { Logo } from "./components/Logo"
import { NotificationBell } from "./components/NotificationBell"

import { useMobileSearchCategory, useSearchMobile } from "@/store"

import styles from "./styles/styles.module.scss"

export default function MobileHeader() {
  const visibleSearchMobile = useSearchMobile(({ visible }) => visible)
  const visibleSearchCategory = useMobileSearchCategory(({ visible }) => visible)

  return (
    <header className={styles.header} data-test="header-mobile" data-not={visibleSearchCategory || visibleSearchMobile}>
      <Logo />
      <NotificationBell />
    </header>
  )
}
