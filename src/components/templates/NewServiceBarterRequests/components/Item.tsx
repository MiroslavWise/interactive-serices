"use client"

import { isMobile } from "react-device-detect"

import type { INewCreate, TNewCreate } from "../types/types"

import { ImageStatic } from "@/components/common/Image"

import {
    useVisibleNewServiceBarterRequests,
    useAddCreateModal,
} from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Item: TNewCreate = (props: INewCreate) => {
    const { imageSrc, label, value } = props ?? {}
    const dispatchVisibleTypeCreateOptionals = useAddCreateModal(
        ({ dispatchVisibleTypeCreateOptionals }) =>
            dispatchVisibleTypeCreateOptionals,
    )
    const dispatchNewServiceBarterRequests = useVisibleNewServiceBarterRequests(
        ({ dispatchNewServiceBarterRequests }) =>
            dispatchNewServiceBarterRequests,
    )

    function handleType() {
        if (!value) {
            dispatchNewServiceBarterRequests(false)
        } else {
            dispatchVisibleTypeCreateOptionals({ visible: true, type: value })
            dispatchNewServiceBarterRequests(false)
        }
    }
    return (
        <li
            className={styles.containerLi}
            onClick={handleType}
            data-mobile={isMobile}
        >
            <ImageStatic src={imageSrc} width={36} height={36} alt={imageSrc} />
            <p>{label}</p>
        </li>
    )
}
