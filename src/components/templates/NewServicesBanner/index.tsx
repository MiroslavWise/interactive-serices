"use client"

import type { TNewServicesBanner } from "./types/types"

import { ButtonClose } from "@/components/common/Buttons"
import { NewCreateBadge } from "./components/NewCreateBadge"

import { cx } from "@/lib/cx"
import { NEW_CREATE_BADGES } from "./constants"
import { useVisibleBannerNewServices } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const NewServicesBanner: TNewServicesBanner = ({}) => {
    const isVisibleNewServicesBanner = useVisibleBannerNewServices(({ isVisibleNewServicesBanner }) => isVisibleNewServicesBanner)
    const dispatchNewServicesBanner = useVisibleBannerNewServices(({ dispatchNewServicesBanner }) => dispatchNewServicesBanner)

    function close() {
        dispatchNewServicesBanner(false)
    }

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={isVisibleNewServicesBanner}>
            <section id="container-services-banner">
                <ButtonClose
                    onClick={close}
                    position={{
                        right: 12,
                        top: 12,
                    }}
                />
                <h3>Я хочу создать</h3>
                <ul>
                    {NEW_CREATE_BADGES.map((item) => (
                        <NewCreateBadge key={`${item.value}_${item.label}`} {...item} />
                    ))}
                </ul>
            </section>
        </div>
    )
}
