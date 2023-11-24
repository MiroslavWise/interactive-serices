"use client"

import { isMobile } from "react-device-detect"

import type { TNewCreateBadge } from "../types/types"

import { ImageStatic } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useVisibleBannerNewServices, useAddCreateModal } from "@/store/hooks"

import styles from "./styles/styles.module.scss"

export const NewCreateBadge: TNewCreateBadge = ({ value, imageSrc, label }) => {
    const { dispatchVisibleTypeCreateOptionals } = useAddCreateModal((_) => ({
        dispatchVisibleTypeCreateOptionals:
            _.dispatchVisibleTypeCreateOptionals,
    }))
    const { dispatchNewServicesBanner } = useVisibleBannerNewServices((_) => ({
        dispatchNewServicesBanner: _.dispatchNewServicesBanner,
    }))

    function handleType() {
        if (!value) {
            dispatchNewServicesBanner(false)
        } else {
            dispatchVisibleTypeCreateOptionals({ visible: true, type: value })
            dispatchNewServicesBanner(false)
        }
    }

    return (
        <li
            className={cx(styles.containerLiNew, isMobile && styles.mobile)}
            onClick={handleType}
        >
            <ImageStatic src={imageSrc} alt={imageSrc} width={36} height={36} />
            <p>{label}</p>
        </li>
    )
}
