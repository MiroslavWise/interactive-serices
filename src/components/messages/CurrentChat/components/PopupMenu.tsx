"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { type DispatchWithoutAction } from "react"
import { useSearchParams } from "next/navigation"

import type { TPopupMenu } from "./types/types"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers/hooks/usePush"
import { MENU_ITEM_POPUP, type TTypeActionMenu } from "../constants"
import { usePopupMenuChat, useVisibleModalBarter } from "@/store/hooks"

import mainStyles from "../styles/style.module.scss"
import styles from "./styles/popup-menu.module.scss"

export const PopupMenu: TPopupMenu = ({ fullName, photo }) => {
    const searchParams = useSearchParams()
    const id = searchParams.get("user")
    const { isVisible, setIsVisible } = usePopupMenuChat()
    const { setIsVisibleBarter } = useVisibleModalBarter()
    const { handlePush } = usePush()

    function handleClickMenu(value: TTypeActionMenu) {
        const handleObject: Record<TTypeActionMenu, DispatchWithoutAction> = {
            onProfile: () => handlePush(`/user?id=${id}`),
            openBarter: () =>
                setIsVisibleBarter({
                    isVisible: true,
                    dataProfile: { fullName: fullName, photo: photo },
                }),
            deleteChat: () => {},
            allRequest: () => {},
            currentExchanges: () => {},
        }
        setIsVisible(false)
        handleObject[value]()
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
