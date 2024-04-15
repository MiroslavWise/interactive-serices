"use client"

import { LinkMap } from "./LinkMap"
import { LinkOffers } from "./LinkOffers"
import { LinkProfile } from "./LinkProfile"
import { LinkMessages } from "./LinkMessages"
import { LinkNotification } from "./LinkNotification"

import { useAuth } from "@/store"

import styles from "../styles/links.module.scss"

export const Links = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  return isAuth ? (
    <ul className={styles.linksWrapper}>
      <LinkMap />
      <LinkProfile />
      <LinkOffers />
      <LinkMessages />
      <LinkNotification />
    </ul>
  ) : null
}
