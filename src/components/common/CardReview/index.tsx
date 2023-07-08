import { useId } from "react"
import Image from "next/image"

import type { TCardReview } from "./types"

import { Rate } from "@/components/common/Rate"

import styles from "./style.module.scss"

export const CardReview: TCardReview = ({ user, date, rate, description, images }) => {
  const id = useId()

  return (
    <li className={styles.container}>
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
    </li>
  )
}