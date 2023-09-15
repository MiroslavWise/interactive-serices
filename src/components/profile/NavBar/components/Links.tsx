"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { usePathname } from "next/navigation"

import { cx } from "@/lib/cx"
import { useChat } from "@/store/hooks"
import { LINKS_PROFILE } from "./constants"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./styles/style.module.scss"

export const Links = () => {
    const active = usePathname()
    const { currentChatId } = useChat()
    const { handlePush } = usePush()

    return !isMobile ? (
        <ul className={styles.linksWrapper}>
            {LINKS_PROFILE.map(({ path, label, icon }) => (
                <li
                    key={path + "link"}
                    onClick={() => {
                        if (path === "/messages" && currentChatId) {
                            handlePush(`${path}?user=${currentChatId}`)
                            return
                        }
                        handlePush(`${path}`)
                    }}
                    className={cx(active.includes(path) && styles.active)}
                >
                    <Image src={icon} alt={icon} width={24} height={24} />
                    <a>{label}</a>
                </li>
            ))}
        </ul>
    ) : null
}
