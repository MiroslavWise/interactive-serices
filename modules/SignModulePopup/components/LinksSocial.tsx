import { type FC } from "react"

import { LinkItem } from "./LinkItem"

import { ITEMS_SOCIAL_LINK } from "./constants"

import styles from "./styles/style.module.scss"

export const LinksSocial: FC = ({ }) => {    
  return (
    <footer className={styles.wrapSocial}>
      {
        ITEMS_SOCIAL_LINK.map(({ value, src }) => (
          <LinkItem
            key={value}
            src={src}
          />
        ))
      }
    </footer>
  )
}