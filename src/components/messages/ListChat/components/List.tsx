"use client"

import { isMobile } from "react-device-detect"
import { Fragment, memo, useEffect } from "react"

import type { TList } from "./types/types"

import { ItemListChat } from "./ItemListChat"
import { Divider } from "@/components/common/Divider"

import { useMessages } from "@/store/state/useMessages"

import styles from "./styles/style.module.scss"
import { profileService } from "@/services/profile"

export const ComponentList: TList = ({ items }) => {
    const { setPhotoAndName, data } = useMessages()
    useEffect(() => {
        const arrayRequest = () => {
            return items
                .filter((item) => {
                    const userId = item.receiverIds[0]!
                    const id = item?.id!
                    return !data[id]?.id
                })
                .map((item) =>
                    profileService.getProfileThroughUserId(
                        item?.receiverIds?.[0]!,
                    ),
                )
        }

        Promise.all([...arrayRequest()]).then((responses) => {
            console.log("arrayRequest: ", responses)
            if (responses?.length > 0) {
                responses?.forEach((item) => {
                    if (item?.ok) {
                        if (!!item?.res) {
                            const idThread = items.find(
                                (item_) =>
                                    item_?.receiverIds?.includes(
                                        Number(item?.res?.userId),
                                    ),
                            )?.id!
                            const name = `${item?.res?.firstName! || ""} ${
                                item?.res?.lastName! || ""
                            }`
                            const photo = item?.res?.image?.attributes?.url!
                            setPhotoAndName({
                                id: idThread!,
                                userId: item?.res?.userId!,
                                photo: photo,
                                name: name,
                            })
                        }
                    }
                })
            }
        })
    }, [data, items])

    return (
        <ul
            className={
                isMobile ? styles.containerListMobile : styles.containerList
            }
        >
            {items?.map((item, index) => (
                <Fragment key={`${item.id}-${index}-item-chat`}>
                    <ItemListChat item={item} />
                    {index < items.length - 1 && !isMobile ? <Divider /> : null}
                </Fragment>
            ))}
        </ul>
    )
}

export const List = memo(ComponentList)
