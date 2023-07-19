
import { Buttons } from "./components/Buttons"
import { Logo } from "./components/Logo"

import styles from "./styles/style.module.scss"

export const NavBar = () => {

  return (
    <nav className={styles.nav}>
      <Logo />
      <Buttons />
    </nav>
  )
}