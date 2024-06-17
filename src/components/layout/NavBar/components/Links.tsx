"use client"

import { LinkMap } from "./LinkMap"
import { LinkOffers } from "./LinkOffers"
import { LinkProfile } from "./LinkProfile"
import { LinkMessages } from "./LinkMessages"
import { usePathname } from "next/navigation"
import { LinkNotification } from "./LinkNotification"

import { useAuth } from "@/store"

import styles from "../styles/links.module.scss"

export const Links = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const pathname = usePathname()

  if (pathname.includes("/legal/")) return null

  return isAuth ? (
    <ul className={styles.linksWrapper}>
      <LinkMap pathname={pathname} />
      <LinkProfile pathname={pathname} />
      <LinkOffers pathname={pathname} />
      <LinkMessages pathname={pathname} />
      <LinkNotification pathname={pathname} />
    </ul>
  ) : null
}
