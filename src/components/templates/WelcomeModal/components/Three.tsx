import { ImageStatic } from "@/components/common/Image"

import { cx } from "@/lib/cx"

import styles from "./styles/screens.module.scss"

const title = "Создавайте свои объявления"
const description =
  'Делитесь своими предложениями и просьбами. Жители мира Sheira могут создавать собственные предложения-карточки на карте города. Для этого нажмите кнопку "Предложить обмен" и заполните поля в открывшемся окне. Вы можете добавить на карту просьбу или предложение, или ответить на уже существующие просьбы или предложения.'

export const Three = () => {
  return (
    <section className={cx(styles.container3)}>
      <div data-absolute-image>
        <ImageStatic src="/png/welcome/three.png" alt="three" width={600} height={610} />
        <div className={styles.divider} />
      </div>
      <div data-block-text>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}
