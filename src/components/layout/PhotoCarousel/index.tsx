"use client"

import { isMobile } from "react-device-detect"

import { LargePhoto } from "./components/LargePhoto"
import { FooterPhotos } from "./components/FooterPhotos"
import { ButtonClose } from "@/components/common/Buttons"
import { ButtonPrevNext } from "./components/ButtonPrevNext"

import { cx } from "@/lib/cx"
import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function PhotoCarousel() {
    const { isVisible, setVisibleCarousel } = useVisiblePhotosCarousel()

    return (
        <div className={cx(styles.wrapper, isVisible && styles.active)}>
            <ButtonClose
                onClick={() => {
                    setVisibleCarousel({ visible: false })
                }}
                position={{ right: 20, top: 20 }}
            />
            {!isMobile ? <ButtonPrevNext /> : null}
            {isVisible ? <LargePhoto /> : null}
            {isVisible ? <FooterPhotos /> : null}
        </div>
    )
}
