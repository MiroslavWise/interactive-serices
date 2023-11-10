import { type FC } from "react"
import { isMobile } from "react-device-detect"

import { LinkItem } from "./LinkItem"

import { ITEMS_SOCIAL_LINK } from "../constants/social"

import styles from "../styles/links-social.module.scss"

export const LinksSocial: FC = ({}) => {
    return (
        <footer className={styles.container} data-mobile={isMobile}>
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
