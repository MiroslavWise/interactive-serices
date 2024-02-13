"use client"

import { isMobile } from "react-device-detect"

import { Links } from "./components/Links"
import { Logo } from "./components/Logo"
import { Buttons } from "./components/Buttons"

import { useAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function NavBarProfile() {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  return typeof isMobile !== "undefined" && !isMobile ? (
    <nav className={styles.nav}>
      <Logo />
      {isAuth && <Links />}
      <Buttons />
    </nav>
  ) : null
}
