"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { isMobile, isTablet } from "react-device-detect"

import type { TFooterMenu } from "./types"

import { usePush } from "@/helpers"
import { MENU_ITEMS } from "./constants"
import { useActivePath } from "@/helpers/hooks/useActivePash"
import { useAuth, useModalAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const FooterMenu: TFooterMenu = ({}) => {
    const visible = useModalAuth(({visible}) => visible)
    const type = useModalAuth(({type}) => type)
    const dispatchAuthModal = useModalAuth(({dispatchAuthModal}) => dispatchAuthModal)
    const pathname = usePathname()
    const { handlePush } = usePush()
    const is = useAuth(({isAuth}) => isAuth)
    const valuePath = useActivePath()

    const handleSignInOrSignUp = (path: string | null) => {
        if (`/${path}` !== pathname && path !== null) {
            handlePush(`/${path}`)
        } else if (path === null) {
            dispatchAuthModal({
                visible: !visible,
                type: ["SignIn", "SignUp"].includes(type!) ? type : "SignIn",
            })
        }
    }

    return isMobile && !isTablet ? (
        <motion.footer
            className={styles.container}
            initial={{ bottom: -70 }}
            animate={{ bottom: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ bottom: -70 }}
        >
            <ul>
                {MENU_ITEMS(is).map((item) => (
                    <li
                        key={item.key}
                        onClick={() => handleSignInOrSignUp(item.path)}
                    >
                        <div className={styles.itemsIconLabel}>
                            {item.isCenter ? (
                                <div
                                    className={styles.centerPoligon}
                                    onClick={() => {}}
                                >
                                    <Image
                                        src={
                                            valuePath === item.path
                                                ? item.icon.fill
                                                : item.icon.regular
                                        }
                                        alt={item.label}
                                        width={28}
                                        height={28}
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <Image
                                    src={
                                        valuePath === item.path
                                            ? item.icon.fill
                                            : item.icon.regular
                                    }
                                    alt={item.label}
                                    width={24}
                                    height={24}
                                    unoptimized
                                />
                            )}
                            <p>{item.label}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.footer>
    ) : null
}
