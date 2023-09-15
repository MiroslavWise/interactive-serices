"use client"

import { isMobile } from "react-device-detect"
import { Fragment, memo } from "react"

import type { TList } from "./types/types"

import { ItemListChat } from "./ItemListChat"
import { Divider } from "@/components/common/Divider"

import styles from "./styles/style.module.scss"

export const ComponentList: TList = ({ items }) => {
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
