
import { Buttons } from "./components/Buttons"
import { Links } from "./components/Links"
import { Logo } from "./components/Logo"

import styles from "./styles/style.module.scss"

export const NavBarUser = async () => {

  return (
    <nav className={styles.nav}>
      <Logo />
      <Buttons />
    </nav>
  )
}

export const NavBarProfile = async () => {

  return (
    <nav className={styles.nav}>
      <Logo />
      <Links />
      <Buttons />
    </nav>
  )
}