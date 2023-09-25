"use client"

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

export const CreationAlertAndDiscussionMap: TCreationAlertAndDiscussionMap = ({
    refCreate,
    isOpen,
    coord,
    addressInit,
}) => {
    const { setVisibleAndType } = useAddCreateModal()
    const { setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()
    const { setAddressInit: setAddressInitAlert } = useCreateAlert()
    const { setAddressInit: setAddressInitDiscussion } = useCreateDiscussion()

    function handleType(value: TAddCreate) {
        if (value === "alert") {
            if (setAddressInitAlert) setAddressInitAlert(addressInit!)
        }
        if (value === "discussion") {
            if (setAddressInitDiscussion) setAddressInitDiscussion(addressInit!)
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
            style={{
                top: coord.y,
                left: coord.x,
            }}
        >
            <h3>Я хочу создать </h3>
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
