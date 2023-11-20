"use client"

import { isMobile } from "react-device-detect"

import type { TNewCreateBadge } from "../types/types"

import { ImageStatic } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useVisibleBannerNewServices } from "@/store/hooks"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/styles.module.scss"

export const NewCreateBadge: TNewCreateBadge = ({ value, imageSrc, label }) => {
    const { dispatchVisibleTypeCreateOptionals: setVisibleAndType } = useAddCreateModal()
    const { dispatchNewServicesBanner: setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()

    function handleType() {
        if (!value) {
            setIsVisibleNewServicesBanner(false)
        } else {
            setVisibleAndType({ visible: true, type: value })
            setIsVisibleNewServicesBanner(false)
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
