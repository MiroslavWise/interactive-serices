


import { BadgeCoinsPlus } from "./BadgeCoinsPlus"
import { Carousel } from "./Carousel"

import styles from "./styles/style.module.scss"

export const ContentTitleCarousel = ({ }) => {
  
  return (
    <section className={styles.containerTitleCarousel}>
      <h2>Пожалуйста, выберите параметры бартера</h2>
      <BadgeCoinsPlus />
      <Carousel />
    </section>
  )
}