"use client"

import { isMobile } from "react-device-detect"

import type { TNewServicesBanner } from "./types/types"

import { Glasses } from "./components/Glasses"
import { ButtonClose } from "@/components/common/Buttons"
import { NewCreateBadge } from "./components/NewCreateBadge"

import { cx } from "@/lib/cx"
import { NEW_CREATE_BADGES } from "./constants"
import { useVisibleBannerNewServices } from "@/store/hooks/useVisible"

import styles from "./styles/style.module.scss"

export const NewServicesBanner: TNewServicesBanner = ({}) => {
    const { isVisibleNewServicesBanner, setIsVisibleNewServicesBanner } =
        useVisibleBannerNewServices()

    function close() {
        setIsVisibleNewServicesBanner(false)
    }

    return (
        <div
            className={cx(
                styles.wrapper,
                isMobile && styles.mobile,
                isVisibleNewServicesBanner && styles.active,
            )}
        >
            <div className={styles.container}>
                <h3>Я хочу создать</h3>
                <ul>
                    {NEW_CREATE_BADGES.filter((_) => _.value !== "offer").map(
                        (item) => (
                            <NewCreateBadge
                                key={`${item.value}_${item.label}`}
                                {...item}
                            />
                        ),
                    )}
                </ul>
                <ButtonClose
                    onClick={close}
                    position={{
                        right: 12,
                        top: 12,
                    }}
                />
                <Glasses />
            </div>
        </div>
    )
}
