import type { TBlockBarter } from "./types/types"

import IconRepeat from "@/components/icons/IconRepeat"
import { BadgeServices } from "@/components/common/Badge"

import styles from "./styles/style.module.scss"

export const BlockBarter: TBlockBarter = ({ initiator, consigner }) => {
  return (
    <section className={styles.contentBarter}>
      <BadgeServices {...initiator!} isClickable />
      <article>
        <IconRepeat />
      </article>
      <BadgeServices {...consigner!} isClickable />
    </section>
  )
}
