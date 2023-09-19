"use client"

import Image from "next/image"

import type { TNewCreateBadge } from "../types/types"

import { useVisibleBannerNewServices } from "@/store/hooks"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/styles.module.scss"

export const NewCreateBadge: TNewCreateBadge = ({ value, imageSrc, label }) => {
    const { setVisibleAndType } = useAddCreateModal()
    const { setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()

    function handleType() {
        if (!value) {
            setIsVisibleNewServicesBanner(false)
        } else {
            setVisibleAndType({ visible: true, type: value })
            setIsVisibleNewServicesBanner(false)
        }
    }

    return (
        <li className={styles.containerLiNew} onClick={handleType}>
            <Image src={imageSrc} alt={imageSrc} width={36} height={36} />
            <p>{label}</p>
        </li>
    )
}
