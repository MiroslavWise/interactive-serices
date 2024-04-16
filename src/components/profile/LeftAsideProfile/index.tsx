import { memo } from "react"

import { FooterAsideLeft } from "./components/Footer"
import { BlockProfileAside, BlockDesiredServices, ButtonFriends } from "@/components/profile"

import styles from "./styles/style.module.scss"

export const LeftAsideProfile = memo(function ({ isCollapsed = false }: { isCollapsed?: boolean }) {
  return (
    <aside className={styles.asideLeft} data-collapsed={isCollapsed} data-test="left-aside-profile">
      <ul>
        <BlockProfileAside />
        <ButtonFriends />
        <BlockDesiredServices />
        <FooterAsideLeft />
      </ul>
    </aside>
  )
})
