"use client"

import { isMobile } from "react-device-detect"

import { ButtonClose } from "@/components/common/Buttons"
import { ButtonPrevNext } from "./components/ButtonPrevNext"
import { LargePhoto } from "./components/LargePhoto"
import { FooterPhotos } from "./components/FooterPhotos"

import { useVisiblePhotosCarousel } from "@/store/hooks"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export function PhotoCarousel() {
  const { isVisible, setVisibleCarousel } = useVisiblePhotosCarousel()

  return (
    <div className={cx(styles.wrapper, isVisible && styles.active)}>
      <ButtonClose
        onClick={() => { setVisibleCarousel({ visible: false }) }}
        position={{ right: 20, top: 20, }}
      />
      {!isMobile ? <ButtonPrevNext /> : null}
      <LargePhoto />
      <FooterPhotos />
    </div>
  )
}