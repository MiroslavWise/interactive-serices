import { ImageStatic } from "@/components/common/Image"

import { cx } from "@/lib/cx"

import styles from "./styles/screens.module.scss"

const title = "Добро пожаловать в Sheira!"
const description =
  "Sheira - это карта города, на которую каждый пользователь может добавить предложение или просьбу, создать дискуссию или отметить срочное событие."

export const One = () => {
  return (
    <section className={cx(styles.container1)}>
      <div data-absolute-image>
        <ImageStatic src="/png/welcome/one.png" alt="welcome-one" width={722} height={1802} />
        <div className={styles.divider} />
      </div>
      <div data-block-text>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}
