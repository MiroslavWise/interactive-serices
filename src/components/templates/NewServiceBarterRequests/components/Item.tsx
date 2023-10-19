"use client"

import type { INewCreate, TNewCreate } from "../types/types"

import { ImageStatic } from "@/components/common/Image"

import { useVisibleNewServiceBarterRequests } from "@/store/hooks"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/style.module.scss"

export const Item: TNewCreate = (props: INewCreate) => {
    const { imageSrc, label, value } = props ?? {}
    const { dispatchVisibleTypeCreateOptionals: setVisibleAndType } = useAddCreateModal()
    const { setIsVisibleNewServiceBarterRequests } =
        useVisibleNewServiceBarterRequests()

    function handleType() {
        if (!value) {
            setIsVisibleNewServiceBarterRequests(false)
        } else {
            setVisibleAndType({ visible: true, type: value })
            setIsVisibleNewServiceBarterRequests(false)
        }
    }
    return (
        <li className={styles.containerLi} onClick={handleType}>
            <ImageStatic src={imageSrc} width={36} height={36} alt={imageSrc} />
            <p>{label}</p>
        </li>
    )
}
