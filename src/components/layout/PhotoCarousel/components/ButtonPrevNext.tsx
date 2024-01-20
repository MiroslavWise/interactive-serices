"use client"

import { setPrevPhotoCarousel, setNextPhotoCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ButtonPrevNext = () => {
    return (
        <>
            <div className={styles.prevButton} onClick={setPrevPhotoCarousel}></div>
            <div className={styles.nextButton} onClick={setNextPhotoCarousel}></div>
        </>
    )
}
