"use client"

import { useSwipeable } from "react-swipeable"

import { NextImageMotion } from "@/components/common/Image"

import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function LargePhoto() {
    const currentPhoto = useVisiblePhotosCarousel(({ currentPhoto }) => currentPhoto)
    const setNext = useVisiblePhotosCarousel(({ setNext }) => setNext)
    const setPrev = useVisiblePhotosCarousel(({ setPrev }) => setPrev)

    const handlers = useSwipeable({
        onSwipedLeft: setNext,
        onSwipedRight: setPrev,
    })

    return (
        <div className={styles.containerLargePhoto} {...handlers}>
            <NextImageMotion src={currentPhoto?.url!} onClick={setNext} alt="offer-image" height={1080} width={1920} />
        </div>
    )
}
