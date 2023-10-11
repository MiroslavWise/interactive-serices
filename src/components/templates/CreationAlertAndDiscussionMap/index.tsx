"use client"

import { memo } from "react"
import { isMobile } from "react-device-detect"

import type { TCreationAlertAndDiscussionMap } from "./types/types"
import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { ImageStatic } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useVisibleBannerNewServices } from "@/store/hooks"
import { useCreateAlert } from "@/store/state/useCreateAlert"
import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"
import { NEW_CREATE_BADGES_ALERT_OR_DISCUSSION } from "../NewServicesBanner/constants"

import styles from "./styles/style.module.scss"
import { useCreateOffer } from "@/store/state/useCreateOffer"
import { useCreateRequest } from "@/store/state/useCreateRequest"

export const $CreationAlertAndDiscussionMap: TCreationAlertAndDiscussionMap = ({
    refCreate,
    isOpen,
    addressInit,
}) => {
    const { setVisibleAndType } = useAddCreateModal()
    const { setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()
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
            className={cx(
                styles.container,
                isOpen && styles.open,
                isMobile && styles.mobile,
            )}
            ref={refCreate}
        >
            <h3>Я хочу создать</h3>
            <section>
                {NEW_CREATE_BADGES_ALERT_OR_DISCUSSION.map((item) => (
                    <li
                        key={`${item.value}-map-absolute`}
                        className={cx(
                            styles.containerLiNew,
                            isMobile && styles.mobile,
                        )}
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
