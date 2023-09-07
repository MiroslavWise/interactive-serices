"use client"

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

    return (
        <div
            className={cx(
                styles.wrapper,
                isVisibleNewServicesBanner && styles.active,
            )}
        >
            <div className={styles.container}>
                <h3>Я хочу создать новый</h3>
                <ul>
                    {NEW_CREATE_BADGES.map((item) => (
                        <NewCreateBadge
                            key={`${item.value}_${item.label}`}
                            {...item}
                        />
                    ))}
                </ul>
                <ButtonClose
                    onClick={() => setIsVisibleNewServicesBanner(false)}
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
