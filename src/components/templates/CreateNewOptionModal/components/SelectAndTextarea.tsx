import { type ReactNode } from "react"
import styles from "./styles/style.module.scss"

export const SelectAndTextarea = ({ children }: { children: ReactNode }) => (
    <div className={styles.selectAndTextarea}>{children}</div>
)
