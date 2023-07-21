import { useId } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import type { TCardReview } from "./types"

import { Rate } from "@/components/common/Rate"

import { motionItemOnOpacityY } from "@/lib/motion"
import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const CardReview: TCardReview = ({ user, date, rate, description, images, classNames }) => {
  const id = useId()

  return (
    <motion.li
      className={cx(styles.container, classNames)}
      variants={motionItemOnOpacityY}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.userDate}>
            <a>{user}</a>
            <p>{date}</p>
          </div>
          <Rate rate={rate} />
        </header>
        <p className={styles.description}>{description}</p>
        <footer className={styles.images}>
          {
            Array.isArray(images)
              ? images?.map((item, index) => (
                <Image
                  key={`${index}_${id}`}
                  src={item}
                  alt={item}
                  width={100}
                  height={72}
                />
              )) : null
          }
        </footer>
      </div>
    </motion.li>
  )
}