"use client"

import { usePathname } from "next/navigation"

import { LinkMap } from "./LinkMap"
import { LinkOffers } from "./LinkOffers"
import { LinkProfile } from "./LinkProfile"
import { LinkMessages } from "./LinkMessages"
import { LinkNotification } from "./LinkNotification"

import { useAuth } from "@/store"

import styles from "../styles/links.module.scss"
import { cx } from "@/lib/cx"

export const Links = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const pathname = usePathname()

  if (pathname.includes("/legal/")) return null

  return isAuth ? (
    <ul
      className={cx(
        styles.linksWrapper,
        "inline-flex items-center gap-[1.875rem] h-full absolute top-0 bottom-0",
        "*:relative *:inline-flex *:h-full *:gap-2 *:items-center *:cursor-pointer",
      )}
    >
      <LinkMap pathname={pathname} />
      <LinkProfile pathname={pathname} />
      <LinkOffers pathname={pathname} />
      <LinkMessages pathname={pathname} />
      <LinkNotification pathname={pathname} />
    </ul>
  ) : null
}
