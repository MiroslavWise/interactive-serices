import { ReactNode } from "react"
import styles from "../styles/items-pages.module.scss"

export const ItemsPages = ({ children }: { children: ReactNode }) => {
    return <article className={styles.container}>{children}</article>
}
