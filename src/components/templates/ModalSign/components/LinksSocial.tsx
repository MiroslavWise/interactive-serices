import { type FC } from "react"

import { LinkItem } from "./LinkItem"

import styles from "../styles/links-social.module.scss"
import { ITEMS_SOCIAL_LINK } from "../constants/social"

export const LinksSocial: FC = ({}) => {
    return (
        <footer className={styles.container}>
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
