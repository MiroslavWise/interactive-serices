"use client"

import { useEffect } from "react"
import { ButtonClose } from "@/components/common"
import { LargePhoto } from "./components/LargePhoto"
import { FooterPhotos } from "./components/FooterPhotos"
import { ButtonPrevNext } from "./components/ButtonPrevNext"

import { cx } from "@/lib/cx"
import { useResize } from "@/helpers"
import { useVisiblePhotosCarousel, dispatchPhotoCarousel, setPrevPhotoCarousel, setNextPhotoCarousel } from "@/store"

import styles from "./styles/style.module.scss"

type TKeyDown = "ArrowRight" | "ArrowLeft" | any

function PhotoCarousel() {
  const { isTablet } = useResize()

  const isVisible = useVisiblePhotosCarousel(({ isVisible }) => isVisible)

  function keyDown(event: any) {
    const type = (event.code || event.key) as TKeyDown

    if (type === "ArrowLeft") {
      setPrevPhotoCarousel()
      return
    }
    if (type === "ArrowRight") {
      setNextPhotoCarousel()
      return
    }
    if (event.code == "Escape" || event.keyCode === 27) {
      dispatchPhotoCarousel({ visible: false })
    }
  }

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("keyup", keyDown)
    }
    if (!isVisible) {
      document.removeEventListener("keyup", keyDown)
    }
    return () => {
      document.removeEventListener("keyup", keyDown)
    }
  }, [isVisible])

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

PhotoCarousel.displayName = "PhotoCarousel"
export default PhotoCarousel
