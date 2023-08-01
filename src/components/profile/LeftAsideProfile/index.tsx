"use client"


import { BlockProfileAside } from "@/components/profile/BlockProfileAside"
import { FooterAsideLeft } from "./components/Footer"

import styles from "./style.module.scss"

export const LeftAsideProfile = async () => {

  return (
    <aside className={styles.asideLeft}>
      <BlockProfileAside />
      <FooterAsideLeft />
    </aside>
  )
}