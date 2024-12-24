"use client"

import { usePathname } from "next/navigation"

import { LinkMap } from "./LinkMap"
import { LinkProfile } from "./LinkProfile"
import LinkModerator from "./LinkModerator"
import { LinkMessages } from "./LinkMessages"
import { LinkNotification } from "./LinkNotification"

import { cx } from "@/lib/cx"
import { EStatusAuth } from "@/store"
import { useStatusAuth } from "@/helpers/use-status-auth"

import styles from "../styles/links.module.scss"

export const Links = () => {
  const pathname = usePathname()
  const statusAuth = useStatusAuth()

  return statusAuth === EStatusAuth.AUTHORIZED ? (
    <ul
      className={cx(
        styles.linksWrapper,
        "inline-flex items-center gap-[1.875rem] h-full absolute top-0 bottom-0",
        "*:relative *:inline-flex *:h-full *:gap-2 *:items-center *:cursor-pointer",
      )}
    >
      <LinkMap pathname={pathname} />
      <LinkProfile pathname={pathname} />
      {/* <LinkOffers pathname={pathname} /> */}
      <LinkMessages pathname={pathname} />
      <LinkNotification pathname={pathname} />
      <LinkModerator pathname={pathname} />
    </ul>
  ) : null
}
