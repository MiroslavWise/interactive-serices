"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { isMobile, isTablet } from "react-device-detect"

import type { TFooterMenu } from "./types"

import {
    useAuth,
    useVisibleAndTypeAuthModal,
    useWelcomeModal,
} from "@/store/hooks"
import { MENU_ITEMS } from "./constants"
import { usePush } from "@/helpers/hooks/usePush"
import { useActivePath } from "@/helpers/hooks/useActivePash"

import styles from "./styles/style.module.scss"

export const FooterMenu: TFooterMenu = ({ }) => {
    const { visible, type, setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { setVisible } = useWelcomeModal()
    const { isAuth } = useAuth()
    const valuePath = useActivePath()
    const { handlePush } = usePush()

    const handleSignInOrSignUp = () => {
        alert('login')
        setVisibleAndType({
            visible: !visible,
            type: ["SignIn", "SignUp"].includes(type!) ? type : "SignIn",
        })
    }

    const handleGoToPage = (path: string) => handlePush(`/${path}`)

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
                    <li
                        key={item.key}
                    // onClick={(event) => {
                    //     event.preventDefault()
                    //     event.stopPropagation()
                    //     if (item.path !== null) {
                    //         handleGoToPage(item.path)
                    //     }
                    //     if (item.path === null && item.isCenter) {
                    //         //setVisibleAndType({ visible: false })
                    //         handleSignInOrSignUp()
                    //     }
                    // }}
                    >
                        {item.isCenter ? (
                            <div className={styles.itemsIconLabel}>
                                <div className={styles.centerPoligon}
                                    onClick={(event) => {
                                        alert('CLICK')
                                        if (item.path === null) {
                                            handleSignInOrSignUp()
                                        } else {
                                            handleGoToPage(item.path)
                                        }
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
                                <p>{item.label}</p>
                            </div>
                        ) : (
                            <div className={styles.itemsIconLabel} >
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
                                <p>{item.label}</p>
                            </div>

                        )}
                    </li>
                ))}
            </ul>
        </motion.footer>
    ) : null
}
