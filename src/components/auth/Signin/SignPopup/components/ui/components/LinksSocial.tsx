import { type FC } from "react"

import type { ILinkSocial } from "./types/types"
import { LinkItem } from "./LinkItem"

import styles from "../../styles/style.module.scss"

const ITEMS_SOCIAL_LINK: ILinkSocial[] = [
    {
        value: "google",
        srcWorking: "/icons/fill/google.svg",
        srcNotWorking: "/icons/fill/disabled/google.svg",
        path: "/google/login",
        isWorkingLink: true,
    },
    {
        value: "telegram",
        srcWorking: "/icons/fill/telegram.svg",
        srcNotWorking: "/icons/fill/disabled/telegram.svg",
        path: "/api/auth/signin",
        isWorkingLink: false,
    },
    {
        value: "apple",
        srcWorking: "/icons/fill/apple.svg",
        srcNotWorking: "/icons/fill/disabled/apple.svg",
        path: "/apple/login",
        isWorkingLink: false,
    },
    {
        value: "vk",
        srcWorking: "/icons/fill/vk.svg",
        srcNotWorking: "/icons/fill/disabled/apple.svg",
        path: "/vk/login",
        isWorkingLink: false,
    },
    {
        value: "yandex",
        srcWorking: "/icons/fill/yandex.svg",
        srcNotWorking: "/icons/fill/disabled/apple.svg",
        path: "/yandex/login",
        isWorkingLink: true,
    },
]

export const LinksSocial: FC = ({}) => {
    return (
        <footer className={styles.wrapSocial}>
            {ITEMS_SOCIAL_LINK.map(
                ({ value, srcNotWorking, srcWorking, isWorkingLink, path }) => (
                    <LinkItem
                        key={value}
                        src={isWorkingLink ? srcWorking : srcNotWorking}
                        path={path}
                        isActive={isWorkingLink}
                    />
                ),
            )}
        </footer>
    )
}
