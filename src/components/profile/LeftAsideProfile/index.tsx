import { FooterAsideLeft } from "./components/Footer"
import { BlockProfileAside, BlockDesiredServices, ButtonFriends } from "@/components/profile"

import styles from "./styles/style.module.scss"

export const LeftAsideProfile = () => {
  return (
    <aside className={styles.asideLeft}>
      <ul>
        <BlockProfileAside />
        <ButtonFriends />
        <BlockDesiredServices />
        <FooterAsideLeft />
      </ul>
    </aside>
  )
}
