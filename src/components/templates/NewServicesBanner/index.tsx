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
    const { isVisibleNewServicesBanner, dispatchNewServicesBanner: setIsVisibleNewServicesBanner } =
        useVisibleBannerNewServices()

    function close() {
        setIsVisibleNewServicesBanner(false)
    }

    return isVisibleNewServicesBanner ? (
        <div
            className={cx("wrapper-fixed", styles.wrapper)}
            data-visible={isVisibleNewServicesBanner}
        >
            <div data-container>
                <h3>Я хочу создать</h3>
                <ul>
                    {NEW_CREATE_BADGES.map((item) => (
                        <NewCreateBadge
                            key={`${item.value}_${item.label}`}
                            {...item}
                        />
                    ))}
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
    ) : null
}
