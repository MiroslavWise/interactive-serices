"use client"

import { usePathname, useSearchParams } from "next/navigation"

import { LinkMap } from "./components/LinkMap"
import { LinkOffers } from "./components/LinkOffers"
import { LinkProfile } from "./components/LinkProfile"
import { CreateButton } from "./components/CreateButton"
import { LinkMessages } from "./components/LinkMessages"

import styles from "./styles/style.module.scss"

export default function FooterMenu({}) {
  const pathname = usePathname()
  const thread = useSearchParams()?.get("thread")

  return (
    <footer className={styles.container} data-not-active={pathname.includes("messages") && !!thread} data-test="footer-menu-mobile">
      <nav>
        <LinkMap />
        <LinkOffers />
        <CreateButton />
        <LinkMessages />
        <LinkProfile />
      </nav>
    </footer>
  )
}
