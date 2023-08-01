import { BadgeInformationProfile } from "./BadgeInformationProfile"

import styles from "./styles/style.module.scss"

export const Header = () => {

  return (
    <header className={styles.containerHeader}>
      <BadgeInformationProfile />
    </header>
  )
}