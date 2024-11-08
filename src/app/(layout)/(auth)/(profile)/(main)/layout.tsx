import { cx } from "@/lib/cx"

// import BannerMainPage from "@/components/content/BannerMainPage"

import styles from "@/scss/page.module.scss"

type TRoutes = "children" | "left" | "history"

export default ({ children, left, history }: Record<TRoutes, React.ReactNode>) => {
  return (
    <>
      {/* <BannerMainPage /> */}
      <div className={cx(styles.containerProfile)}>
        {left}
        {children}
        {history}
      </div>
    </>
  )
}
