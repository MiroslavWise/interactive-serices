"use client"

import dynamic from "next/dynamic"

import { Logo } from "./components/Logo"
import { Links } from "./components/Links"
import { Buttons } from "./components/Buttons"

const FooterMenu = dynamic(() => import("../FooterMenu"), { ssr: false })
const MobileHeader = dynamic(() => import("../MobileHeader"), { ssr: false })

import styles from "./styles/style.module.scss"

export default function NavBarProfile() {
  return (
    <>
      <nav className={styles.nav}>
        <Logo />
        <Links />
        <Buttons />
      </nav>
      <MobileHeader />
      <FooterMenu />
    </>
  )
}
