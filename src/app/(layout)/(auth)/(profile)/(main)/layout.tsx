import dynamic from "next/dynamic"
import { type PropsWithChildren } from "react"

const RightHistory = dynamic(() => import("./components/RightHistory"), { ssr: false })
const AsideLeftProfile = dynamic(() => import("./components/AsideLeftProfile"), { ssr: false })

import { cx } from "@/lib/cx"

import styles from "@/scss/page.module.scss"

export default ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className={cx(styles.containerProfile)}>
        <AsideLeftProfile />
        {children}
        <RightHistory />
      </div>
    </>
  )
}
