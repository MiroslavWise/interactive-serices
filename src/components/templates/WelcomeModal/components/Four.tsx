import { cx } from "@/lib/cx"
import { ImageStatic } from "@/components/common/Image"

import styles from "./styles/screens.module.scss"

const title = "Начните обсуждение и не только"
const description = "Чтобы создать обсуждение, встречу или отметить событие SOS, кликните по карте и заполните все поля в открывшемся окне."
const placeholder =
  "Важно! Событие SOS предназначено для срочных и критических сообщений. Неправильное использование этой функции может привести к блокировке."

export const Four = () => {
  return (
    <section className={cx(styles.container4)}>
      <div data-absolute-image>
        <ImageStatic src="/png/welcome/four.png" alt="four" width={393} height={1194} />
        <div className={styles.divider} />
      </div>
      <div data-block-text>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}
