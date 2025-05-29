import { type PropsWithChildren } from "react"

import styles from "../styles/items-pages.module.scss"

export const ItemsPages = ({ children, page }: PropsWithChildren<{ page: number }>) => {
  return (
    <article className={styles.container} data-page={page}>
      {children}
    </article>
  )
}
