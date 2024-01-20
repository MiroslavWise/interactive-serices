"use client"

import { dispatchVisibleFilterMobileButton, useMobileFilterButton } from "@/store/state/useMobileFilterButton"

import styles from "./styles/style.module.scss"
import { useFilterMap } from "@/store/hooks"

export const MobileFilterMap = () => {
    const visible = useMobileFilterButton(({ visible }) => visible)
    const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)

    return (
        <div
            className={styles.container}
            data-visible={visible}
            onClick={(event) => {
                event.stopPropagation()
                dispatchVisibleFilterMobileButton(true)
            }}
        >
            <img src="/svg/sliders-01.svg" alt="sliders-white" width={24} height={24} />
            <div data-count={!!idsNumber?.length}>
                <span>{idsNumber?.length || 0}</span>
            </div>
        </div>
    )
}
