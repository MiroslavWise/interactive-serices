"use client"

import { ButtonClose } from "@/components/common"
import { LargePhoto } from "./components/LargePhoto"
import { FooterPhotos } from "./components/FooterPhotos"
import { ButtonPrevNext } from "./components/ButtonPrevNext"

import { cx } from "@/lib/cx"
import { useResize } from "@/helpers"
import { useVisiblePhotosCarousel, dispatchPhotoCarousel } from "@/store"

import styles from "./styles/style.module.scss"

export function PhotoCarousel() {
  const { isTablet } = useResize()

  const isVisible = useVisiblePhotosCarousel(({ isVisible }) => isVisible)

  return (
    <div className={cx(styles.wrapper, "wrapper-fixed")} data-visible={isVisible}>
      {isVisible ? (
        <>
          <ButtonClose
            onClick={() => {
              dispatchPhotoCarousel({ visible: false })
            }}
            position={{ right: 20, top: 20 }}
          />
          {!isTablet ? <ButtonPrevNext /> : null}
          {isVisible ? <LargePhoto /> : null}
          {isVisible ? <FooterPhotos /> : null}
        </>
      ) : null}
    </div>
  )
}
