"use client"

import dynamic from "next/dynamic"

import { Logo } from "./components/Logo"

const FooterMenu = dynamic(() => import("../FooterMenu"), { ssr: false })
const MobileHeader = dynamic(() => import("../MobileHeader"), { ssr: false })
const Links = dynamic(() => import("./components/Links").then((res) => res.Links), { ssr: false })
const Buttons = dynamic(() => import("./components/Buttons").then((res) => res.Buttons), { ssr: false })

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
