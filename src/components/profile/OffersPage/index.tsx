import { ContainerHeader } from "./components/ContainerHeader"
import { ContainerOffersNow } from "./components/ContainerOffersNow"

import styles from "./styles/style.module.scss"

export const OffersPage = () => {

  return (
    <section className={styles.containerOffersPage}>
      <ContainerHeader total={6} />
      <ContainerOffersNow />
    </section>
  )
}