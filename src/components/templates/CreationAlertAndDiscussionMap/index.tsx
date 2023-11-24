"use client"

import { memo } from "react"

import type { TCreationAlertAndDiscussionMap } from "./types/types"
import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { ButtonClose } from "@/components/common"
import { ImageStatic } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useCreateAlert } from "@/store/state/useCreateAlert"
import { useCreateOffer } from "@/store/state/useCreateOffer"
import { useVisibleBannerNewServices } from "@/store/hooks"
import { useCreateRequest } from "@/store/state/useCreateRequest"
import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"
import { NEW_CREATE_BADGES } from "../NewServicesBanner/constants"

import styles from "./styles/style.module.scss"

export const $CreationAlertAndDiscussionMap: TCreationAlertAndDiscussionMap = ({
    refCreate,
    isOpen,
    addressInit,
    setIsOpen,
}) => {
    const { dispatchVisibleTypeCreateOptionals: setVisibleAndType } =
        useAddCreateModal()
    const { dispatchNewServicesBanner: setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()
    const { setAddressInit: setAddressInitAlert } = useCreateAlert()
    const { setAddressInit: setAddressInitDiscussion } = useCreateDiscussion()
    const { setAddressInit: setAddressInitOffer } = useCreateOffer()
    const { setAddressInit: setAddressInitRequest } = useCreateRequest()

    function handleType(value: TAddCreate) {
        if (value === "alert") {
            if (setAddressInitAlert) setAddressInitAlert(addressInit!)
        }
        if (value === "discussion") {
            if (setAddressInitDiscussion) setAddressInitDiscussion(addressInit!)
        }
        if (value === "offer") {
            if (setAddressInitOffer) setAddressInitOffer(addressInit!)
        }
        if (value === "request") {
            if (setAddressInitRequest) setAddressInitRequest(addressInit!)
        }
        if (!value) {
            setIsVisibleNewServicesBanner(false)
        } else {
            setVisibleAndType({ visible: true, type: value })
            setIsVisibleNewServicesBanner(false)
        }
    }

    return (
        <div
            className={cx(styles.container, isOpen && styles.open)}
            ref={refCreate}
        >
            <ButtonClose
                onClick={() => setIsOpen(false)}
                position={{ top: 12, right: 12 }}
            />
            <h3>Я хочу создать</h3>
            <section>
                {NEW_CREATE_BADGES.map((item) => (
                    <li
                        key={`${item.value}-map-absolute`}
                        className={cx(styles.containerLiNew)}
                        onClick={() => handleType(item.value!)}
                    >
                        <ImageStatic
                            src={item.imageSrc}
                            alt={item.imageSrc}
                            width={36}
                            height={36}
                        />
                        <p>{item.label}</p>
                    </li>
                ))}
            </section>
            {addressInit?.additional ? (
                <h4>
                    По адресу: <i>{addressInit?.additional}</i>
                </h4>
            ) : null}
        </div>
    )
}

export const CreationAlertAndDiscussionMap = memo(
    $CreationAlertAndDiscussionMap,
)
