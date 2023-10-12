"use client"

import { isMobile } from "react-device-detect"
import { Fragment, memo } from "react"

import type { TList } from "./types/types"

import { ItemListChat } from "./ItemListChat"
import { Divider } from "@/components/common/Divider"
import { MotionUL } from "@/components/common/Motion"

import styles from "./styles/style.module.scss"

const $List: TList = ({ items }) => {
    return (
        <MotionUL
            classNames={[
                isMobile ? styles.containerListMobile : styles.containerList,
            ]}
        >
            {items?.map((item, index) => (
                <Fragment key={`${item?.thread?.id}-${index}-item-chat`}>
                    <ItemListChat {...item} />
                    {index < items.length - 1 && !isMobile ? <Divider /> : null}
                </Fragment>
            ))}
        </MotionUL>
    )
}

export const List = memo($List)
