"use client"

import { usePathname, useSearchParams } from "next/navigation"

import type { TFooterMenu } from "./types"

import { LinkMap } from "./components/LinkMap"
import { LinkOffers } from "./components/LinkOffers"
import { LinkProfile } from "./components/LinkProfile"
import { CreateButton } from "./components/CreateButton"
import { LinkMessages } from "./components/LinkMessages"

import styles from "./styles/style.module.scss"

export const FooterMenu: TFooterMenu = ({}) => {
  const pathname = usePathname()
  const thread = useSearchParams()?.get("thread")
  return (
    <footer className={styles.container} data-not-active={pathname.includes("messages") && !!thread}>
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
