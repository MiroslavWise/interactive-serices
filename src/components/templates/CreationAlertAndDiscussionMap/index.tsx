"use client"

import { memo } from "react"

import type { TCreationAlertAndDiscussionMap } from "./types/types"
import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { ButtonClose } from "@/components/common"
import { ImageStatic } from "@/components/common/Image"

import { NEW_CREATE_BADGES } from "../NewServicesBanner/constants"
import { useVisibleBannerNewServices, openCreateOffers, dispatchAddressOffers } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const $CreationAlertAndDiscussionMap: TCreationAlertAndDiscussionMap = ({ refCreate, isOpen, addressInit, setIsOpen }) => {
    const { dispatchNewServicesBanner } = useVisibleBannerNewServices()

    function handleType(value: TAddCreate) {
        if (value) {
            dispatchAddressOffers(addressInit)
            openCreateOffers(value)
        }
        dispatchNewServicesBanner(false)
    }

    return (
        <div className={styles.container} ref={refCreate} data-visible={isOpen}>
            <ButtonClose onClick={() => setIsOpen(false)} position={{ top: 12, right: 12 }} />
            <h3>Я хочу создать</h3>
            <ul>
                {NEW_CREATE_BADGES.map((item) => (
                    <li key={`${item.value}-map-absolute`} className={styles.containerLiNew} onClick={() => handleType(item.value!)}>
                        <ImageStatic src={item.imageSrc} alt={item.imageSrc} width={36} height={36} />
                        <p>{item.label}</p>
                    </li>
                ))}
            </ul>
            {addressInit?.additional ? (
                <h4>
                    По адресу: <i>{addressInit?.additional}</i>
                </h4>
            ) : null}
        </div>
    )
}

export const CreationAlertAndDiscussionMap = memo($CreationAlertAndDiscussionMap)
