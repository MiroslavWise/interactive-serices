"use client"

import { useSwipeable } from "react-swipeable"

import { NextImageMotion } from "@/components/common"

import { useVisiblePhotosCarousel, setNextPhotoCarousel, setPrevPhotoCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function LargePhoto() {
  const currentPhoto = useVisiblePhotosCarousel(({ currentPhoto }) => currentPhoto)
  const photos = useVisiblePhotosCarousel(({ photos }) => photos)

  const handlers = useSwipeable({
    onSwipedLeft: setNextPhotoCarousel,
    onSwipedRight: setPrevPhotoCarousel,
  })

  return photos?.map((item) => (
    <div
      className={styles.containerLargePhoto}
      {...handlers}
      key={`::${item?.id}::current::photo::`}
      data-current={item?.id === currentPhoto?.id}
    >
      <NextImageMotion src={item?.url!} onClick={setNextPhotoCarousel} alt="offer-image" height={590} width={960} />
    </div>
  ))
}
