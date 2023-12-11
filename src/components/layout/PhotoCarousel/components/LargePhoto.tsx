"use client"

import { useSwipeable } from "react-swipeable"

import { NextImageMotion } from "@/components/common"

import { useVisiblePhotosCarousel, setNextPhotoCarousel, setPrevPhotoCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function LargePhoto() {
    const currentPhoto = useVisiblePhotosCarousel(({ currentPhoto }) => currentPhoto)

    const handlers = useSwipeable({
        onSwipedLeft: setNextPhotoCarousel,
        onSwipedRight: setPrevPhotoCarousel,
    })

    return (
        <div className={styles.containerLargePhoto} {...handlers}>
            <NextImageMotion src={currentPhoto?.url!} onClick={setNextPhotoCarousel} alt="offer-image" height={590} width={960} />
        </div>
    )
}
