"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"

import type { TContainerHeader } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ContainerHeader: TContainerHeader = ({
    total,
    dispatch,
    isToMe,
}) => {
    const stringTotal: string | number = useMemo(() => {
        if (total <= 9 && total >= -9) {
            return `0${total}`
        }
        return total
    }, [total])

    return (
        <div className={cx(styles.containerHeader, isMobile && styles.mobile)}>
            <div className={styles.badgeTotal}>
                <h4>{stringTotal}</h4>
            </div>
            <h4>
                Предложения обменов, пришедшие{" "}
                <span
                    data-active={isToMe}
                    onClick={() => {
                        dispatch({ isToMe: true })
                    }}
                >
                    к Вам
                </span>{" "}
                и{" "}
                <span
                    data-active={!isToMe}
                    onClick={() => {
                        dispatch({ isToMe: false })
                    }}
                >
                    от Вас
                </span>
            </h4>
        </div>
    )
}
