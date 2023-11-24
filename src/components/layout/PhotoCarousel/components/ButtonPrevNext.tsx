"use client"

import { cx } from "@/lib/cx"
import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ButtonPrevNext = () => {
    const { setPrev, setNext } = useVisiblePhotosCarousel((_) => ({
        setPrev: _.setPrev,
        setNext: _.setNext,
    }))

    return (
        <>
            <div className={cx(styles.prevButton)} onClick={setPrev}></div>
            <div className={cx(styles.nextButton)} onClick={setNext}></div>
        </>
    )
}
