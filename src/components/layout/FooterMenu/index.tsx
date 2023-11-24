"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { isMobile, isTablet } from "react-device-detect"

import type { TFooterMenu } from "./types"

import { MENU_ITEMS } from "./constants"
import { useActivePath } from "@/helpers/hooks/useActivePash"
import { useAnimateLoadPage, useAuth, useModalAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const FooterMenu: TFooterMenu = ({}) => {
    const { visible, type, dispatchAuthModal } = useModalAuth((_) => ({
        visible: _.visible,
        type: _.type,
        dispatchAuthModal: _.dispatchAuthModal,
    }))
    const pathname = usePathname()
    const { setIsAnimated } = useAnimateLoadPage((_) => ({
        setIsAnimated: _.setIsAnimated,
    }))
    const { isAuth } = useAuth((_) => ({ isAuth: _.isAuth }))
    const valuePath = useActivePath()

    const handleSignInOrSignUp = () => {
        dispatchAuthModal({
            visible: !visible,
            type: ["SignIn", "SignUp"].includes(type!) ? type : "SignIn",
        })
    }

    const handleGoToPage = (path: string) => (path ? `/${path}` : "/")

    return isMobile && !isTablet ? (
        <motion.footer
            className={styles.container}
            initial={{ bottom: -70 }}
            animate={{ bottom: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ bottom: -70 }}
        >
            <ul>
                {MENU_ITEMS(isAuth).map((item) => (
                    <Link
                        key={item.key}
                        onClick={() => {
                            if (
                                `/${item.path}` !== pathname &&
                                item.path !== null
                            ) {
                                setIsAnimated(true)
                            }
                            if (item.path === null) {
                                handleSignInOrSignUp()
                            }
                        }}
                        href={handleGoToPage(item.path!)}
                    >
                        <div className={styles.itemsIconLabel}>
                            {item.isCenter ? (
                                <div
                                    className={styles.centerPoligon}
                                    onClick={() => {
                                        // handleSignInOrSignUp()
                                    }}
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
                                />
                            )}
                            <p>{item.label}</p>
                        </div>
                    </Link>
                ))}
            </ul>
        </motion.footer>
    ) : null
}
