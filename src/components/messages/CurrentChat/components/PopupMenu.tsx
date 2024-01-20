"use client"

import Image from "next/image"
import { flushSync } from "react-dom"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { type DispatchWithoutAction, memo } from "react"

import type { TPopupMenu } from "./types/types"

import { cx } from "@/lib/cx"
import { serviceThreads } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { useCountMessagesNotReading } from "@/helpers"
import { usePopupMenuChat, useMessagesType } from "@/store/hooks"
import { MENU_ITEM_POPUP, type TTypeActionMenu } from "../constants"

import mainStyles from "../styles/style.module.scss"
import styles from "./styles/popup-menu.module.scss"

export const PopupMenu: TPopupMenu = memo(function $PopupMenu({ dataUser }) {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const type = useMessagesType(({ type }) => type)
    const isVisible = usePopupMenuChat(({ isVisible }) => isVisible)
    const setIsVisible = usePopupMenuChat(({ setIsVisible }) => setIsVisible)
    const { handlePush, handleReplace } = usePush()
    const { refetchCountMessages } = useCountMessagesNotReading()

    function handleClickMenu(value: TTypeActionMenu) {
        const handleObject: Record<TTypeActionMenu, DispatchWithoutAction> = {
            onProfile: () => handlePush(`/user?id=${dataUser?.id!}`),
            openBarter: () => {},
            deleteChat: () => {
                handleDeleteChat()
            },
            allRequest: () => {},
            currentExchanges: () => {},
        }
        setIsVisible(false)
        handleObject[value]()
    }

    function handleDeleteChat() {
        serviceThreads.patch({ enabled: false }, Number(idThread)).then((response) => {
            refetchCountMessages().finally(() => {
                flushSync(() => {
                    handleReplace("/messages")
                })
            })
        })
    }

    return (
        <div className={styles.wrapper} data-visible={isVisible}>
            <div className={cx(mainStyles.button, styles.dots)} onClick={() => setIsVisible()}>
                <Image src="/svg/x-close.svg" alt="dots-vertical" width={24} height={24} unoptimized />
            </div>
            <motion.ul layout data-is-open={isVisible} className={cx(styles.menu)} initial={{ borderRadius: 12 }}>
                {MENU_ITEM_POPUP.map((item) => (
                    <li key={item.value} onClick={() => handleClickMenu(item.value)}>
                        <Image src={item.image.url} alt={item.image.alt} width={20} height={20} unoptimized />
                        <p>{item.label}</p>
                    </li>
                ))}
            </motion.ul>
        </div>
    )
})
