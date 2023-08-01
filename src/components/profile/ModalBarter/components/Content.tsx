import { ContentTitleCarousel } from "./ContentTitleCarousel"

import styles from "./styles/style.module.scss"

export const Content = ({ }) => {
  
  return (
    <main className={styles.containerContent}>
      <ContentTitleCarousel />
    </main>
  )
}