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
        if (items?.length > 0) {
            const arrayRequest = () => {
                return items
                    .filter((item) => {
                        const id = item?.id!
                        return !data[id]?.id
                    })

                    .map((item) => ({
                        id: item.id!,
                        request: profileService.getProfileThroughUserId(
                            item?.receiverIds?.[0]!,
                        ),
                    }))
            }

            Promise.all([
                ...arrayRequest().map((item) => ({
                    id: item.id,
                    request: item.request,
                })),
            ]).then((responses) => {
                console.log("responses: ", responses)
                responses.forEach((item) => {
                    item?.request?.then((response) => {
                        if (response?.ok) {
                            if (!!response?.res) {
                                const idThread = item?.id!
                                const name = `${
                                    response?.res?.firstName! || ""
                                } ${response?.res?.lastName! || ""}`
                                const photo =
                                    response?.res?.image?.attributes?.url!
                                setPhotoAndName({
                                    id: idThread!,
                                    userId: response?.res?.userId!,
                                    photo: photo,
                                    name: name,
                                })
                            }
                        }
                    })
                })
            })
        }
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
