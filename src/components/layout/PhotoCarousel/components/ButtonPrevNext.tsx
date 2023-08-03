import { useMemo } from "react"

import { useVisiblePhotosCarousel } from "@/store/hooks"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonPrevNext = () => {
  const { isVisible, setVisibleCarousel, setCurrentPhoto, photos, currentPhoto } = useVisiblePhotosCarousel()

  const currentIndex = useMemo(() => {
    return photos.findIndex(item => item.id === currentPhoto?.id) || 0
  }, [photos, currentPhoto])

  function handleNext() {
    if (currentIndex === photos.length - 1) {
      return
    }
    setCurrentPhoto({ currentPhoto: photos[currentIndex + 1] })
  }

  function handlePrev() {
    if (currentIndex === 0) {
      return
    }
    setCurrentPhoto({ currentPhoto: photos[currentIndex - 1] })
  }

  return (
    <>
      <div className={cx(styles.prevButton, currentIndex === 0 && styles.disabled)} onClick={handlePrev}>

      </div>
      <div className={cx(styles.nextButton, currentIndex === photos.length - 1 && styles.disabled)} onClick={handleNext}>

      </div>
    </>
  )
}