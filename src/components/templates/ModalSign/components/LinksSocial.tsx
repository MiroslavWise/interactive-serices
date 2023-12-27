import { type FC } from "react"

import { LinkItem } from "./LinkItem"

import { ITEMS_SOCIAL_LINK } from "../constants/social"

export const LinksSocial: FC = ({}) => {
    return (
        <footer className="__links_social__">
            <p>Или продолжить через:</p>
            <div className="__items__">
                {ITEMS_SOCIAL_LINK.map(({ value, srcNotWorking, srcWorking, isWorkingLink, path }) => (
                    <LinkItem key={value} src={isWorkingLink ? srcWorking : srcNotWorking} path={path} isActive={isWorkingLink} />
                ))}
            </div>
        </footer>
    )
}
