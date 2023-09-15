import type { TBadgeAchievements } from "../types/types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"
import Image from "next/image"

export const BadgeAchievements: TBadgeAchievements = ({ title, total, classNames, type }) => {

  return (
    <div className={cx(styles.container, classNames)}>
      <div className={styles.titleAndNumber}>
        <p>{title}</p>
        <section>
          <h2>{total}</h2>
          {type === "up" ? (
            <Image
              src="/svg/arrow-up.svg"
              alt="up"
              width={20}
              height={20}
            />
          ) : null}
          {type === "down" ? (
            <Image
              src="/svg/arrow-down.svg"
              alt="up"
              width={20}
              height={20}
            />
          ) : null}
        </section>
      </div>
    </div>
  )
}