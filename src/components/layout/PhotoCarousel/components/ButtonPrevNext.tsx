"use client"

import { useVisiblePhotosCarousel } from "@/store/hooks"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonPrevNext = () => {
  const { setPrev, setNext } = useVisiblePhotosCarousel()

  return (
    <>
      <div className={cx(styles.prevButton)} onClick={setPrev}>

      </div>
      <div className={cx(styles.nextButton)} onClick={setNext}>

      </div>
    </>
  )
}