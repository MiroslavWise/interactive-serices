import { FooterAsideLeft } from "./components/Footer"
import { BlockProfileAside, BlockDesiredServices, ButtonFriends } from "@/components/profile"

import styles from "./styles/style.module.scss"

function LeftAsideProfile({ isCollapsed = false, isBanner = false }: { isCollapsed?: boolean; isBanner?: boolean }) {
  return (
    <aside className={styles.asideLeft} data-collapsed={isCollapsed} data-test="left-aside-profile" data-is-banner={isBanner}>
      <ul>
        <BlockProfileAside />
        <ButtonFriends />
        <BlockDesiredServices />
        <FooterAsideLeft />
      </ul>
    </aside>
  )
}

LeftAsideProfile.displayName = "LeftAsideProfile"
export default LeftAsideProfile
