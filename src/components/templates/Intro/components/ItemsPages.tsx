import { ReactNode } from "react"

import styles from "../styles/items-pages.module.scss"

export const ItemsPages = ({ children, page }: { children: ReactNode; page: number }) => {
    return (
        <article className={styles.container} data-page={page}>
            {children}
        </article>
    )
}
