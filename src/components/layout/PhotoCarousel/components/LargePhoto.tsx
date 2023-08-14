"use client"

import { useSwipeable } from "react-swipeable"

import { ImageStatic } from "@/components/common/ImageStatic"

import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function LargePhoto() {
  const { currentPhoto, setNext, setPrev } = useVisiblePhotosCarousel()

  const handlers = useSwipeable({
    onSwipedLeft: setNext,
    onSwipedRight: setPrev,
  },)

  return (
    <div
      className={styles.containerLargePhoto}
      {...handlers}
    >
      <ImageStatic
        src={currentPhoto?.url!}
        onClick={setNext}
        alt="large"
        height={1080}
        width={1920}
        classNames={[]}
      />
    </div>
  )
}