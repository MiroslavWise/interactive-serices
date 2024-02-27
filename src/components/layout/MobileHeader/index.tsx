import { Logo } from "./components/Logo"
import { NotificationBell } from "./components/NotificationBell"

import styles from "./styles/styles.module.scss"

export const MobileHeader = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <NotificationBell />
    </header>
  )
}
