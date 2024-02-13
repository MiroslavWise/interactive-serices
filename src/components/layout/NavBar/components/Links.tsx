import { LinkMap } from "./LinkMap"
import { LinkOffers } from "./LinkOffers"
import { LinkProfile } from "./LinkProfile"
import { LinkMessages } from "./LinkMessages"
import { LinkNotification } from "./LinkNotification"

import styles from "../styles/links.module.scss"

export const Links = () => {
  return (
    <ul className={styles.linksWrapper}>
      <LinkMap />
      <LinkProfile />
      <LinkOffers />
      <LinkMessages />
      <LinkNotification />
    </ul>
  )
}
