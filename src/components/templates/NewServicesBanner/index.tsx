"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"

import type { INewCreateBadge, TNewServicesBanner } from "./types/types"

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

    const badges: INewCreateBadge[] = useMemo(() => {
        if (isMobile) {
            const array = [...NEW_CREATE_BADGES]
            array.unshift({
                imageSrc: "/png/create-requests/add-request.png",
                label: "Запрос",
                value: "request",
            })
            return array
        }

        return NEW_CREATE_BADGES
    }, [])

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
                    {badges.map((item) => (
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
    )
}
