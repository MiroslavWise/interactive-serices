import { CustomToggle } from "@/components/common/custom"
import { ContentTitleCarousel } from "./ContentTitleCarousel"

import styles from "./styles/style.module.scss"
import { useState } from "react"

export const Content = ({ }) => {
  const [active, setActive] = useState(false)
  
  return (
    <main className={styles.containerContent}>
      <ContentTitleCarousel />
      <footer>
        <div className={styles.toggleLabel}>
          <CustomToggle isActive={active} setIsActive={setActive} />
          <p>Он-лайн бартер</p>
        </div>
      </footer>
    </main>
  )
}