import { DeleteOffer } from "@/components/templates"

import styles from "@/scss/page.module.scss"

type TRoutes = "children" | "left" | "history"

export default ({ children, left, history }: Record<TRoutes, React.ReactNode>) => (
  <div className={styles.containerProfile}>
    {left}
    {children}
    {history}
    <DeleteOffer />
  </div>
)
