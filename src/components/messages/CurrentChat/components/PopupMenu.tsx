"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { type DispatchWithoutAction } from "react"
import { useSearchParams } from "next/navigation"

import type { TPopupMenu } from "./types/types"

import { cx } from "@/lib/cx"
import { serviceThreads } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { useThread } from "@/store/state/useThreads"
import { MENU_ITEM_POPUP, type TTypeActionMenu } from "../constants"
import { useAuth, usePopupMenuChat, useVisibleModalBarter } from "@/store/hooks"

import mainStyles from "../styles/style.module.scss"
import styles from "./styles/popup-menu.module.scss"

export const PopupMenu: TPopupMenu = ({ fullName, photo, idUser }) => {
    const searchParams = useSearchParams()
    const id = searchParams?.get("user")
    const idThread = searchParams?.get("thread")
    const { userId } = useAuth()
    const { isVisible, setIsVisible } = usePopupMenuChat()
    const { dispatchVisibleBarter: setIsVisibleBarter } = useVisibleModalBarter()
    const { handlePush, handleReplace } = usePush()

    const { getThreads } = useThread((state) => ({
        getThreads: state.getThreads,
    }))

    function handleClickMenu(value: TTypeActionMenu) {
        const handleObject: Record<TTypeActionMenu, DispatchWithoutAction> = {
            onProfile: () => handlePush(`/user?id=${id}`),
            openBarter: () =>
                setIsVisibleBarter({
                    isVisible: true,
                    dataProfile: { fullName: fullName, photo: photo, idUser: idUser },
                }),
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
        serviceThreads.delete(Number(idThread)).then((response) => {
            console.log("--- response delete ---", response)
            getThreads(userId!)
            handleReplace("/messages")
        })
    }

    return (
        <div className={cx(styles.wrapper, isVisible && styles.visible)}>
            <div
                className={cx(mainStyles.button, styles.dots)}
                onClick={() => setIsVisible()}
            >
                <Image
                    src="/svg/x-close.svg"
                    alt="dots-vertical"
                    width={24}
                    height={24}
                />
            </div>
            <motion.ul
                layout
                data-is-open={isVisible}
                className={cx(styles.menu)}
                initial={{ borderRadius: 12 }}
            >
                {MENU_ITEM_POPUP.map((item) => (
                    <li
                        key={item.value}
                        onClick={() => handleClickMenu(item.value)}
                    >
                        <Image
                            src={item.image.url}
                            alt={item.image.alt}
                            width={20}
                            height={20}
                        />
                        <p>{item.label}</p>
                    </li>
                ))}
            </motion.ul>
        </div>
    )
}
