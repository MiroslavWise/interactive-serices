"use client"

import { useMemo } from "react"
import { usePathname, useSearchParams, useParams } from "next/navigation"

import { LinkMap } from "./components/LinkMap"
import { LinkOffers } from "./components/LinkOffers"
import { LinkProfile } from "./components/LinkProfile"
import { CreateButton } from "./components/CreateButton"
import { LinkMessages } from "./components/LinkMessages"

import styles from "./styles/style.module.scss"

export default function FooterMenu({}) {
  const pathname = usePathname()
  const thread = useSearchParams()?.get("thread")
  const params = useParams()

  const notActive = useMemo(
    () => (pathname.includes("messages") && !!thread) || (pathname.includes("/chat") && !!params?.id) || false,
    [pathname, params],
  )

  return (
    <footer className={styles.container} data-not-active={notActive} data-test="footer-menu-mobile">
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
