"use client"

import { useEffect } from "react"

import { ButtonClose } from "@/components/common"
import { LargePhoto } from "./components/LargePhoto"
import { FooterPhotos } from "./components/FooterPhotos"
import { ButtonPrevNext } from "./components/ButtonPrevNext"

import { cx } from "@/lib/cx"
import { useVisiblePhotosCarousel, dispatchPhotoCarousel, setPrevPhotoCarousel, setNextPhotoCarousel } from "@/store"

type TKeyDown = "ArrowRight" | "ArrowLeft" | any

function PhotoCarousel() {
  const isVisible = useVisiblePhotosCarousel(({ isVisible }) => isVisible)

  function keyDown(event: any) {
    const type = (event.code || event.key) as TKeyDown

    if (type === "ArrowLeft") {
      setPrevPhotoCarousel()
      return
    } else if (type === "ArrowRight") {
      setNextPhotoCarousel()
      return
    } else if (event.code == "Escape" || event.keyCode === 27) {
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
    <div className={cx("wrapper-fixed bg-translucent", isVisible ? "!opacity-100 !z-[2000] !visible" : "opacity-0 -z-10 invisible")}>
      <ButtonClose
        onClick={() => {
          dispatchPhotoCarousel({ visible: false })
        }}
        className="!right-5 !top-5"
      />
      <ButtonPrevNext />
      <LargePhoto />
      <FooterPhotos />
    </div>
  )
}

PhotoCarousel.displayName = "PhotoCarousel"
export default PhotoCarousel
