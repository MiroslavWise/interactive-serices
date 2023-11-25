import Image from "next/image"

import type { TBadgeGradient } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const BadgeGradient: TBadgeGradient = ({
    coins,
    handleClick,
    classNames,
    type,
    about,
}) => {
    return (
        <div
            onClick={() => {
                if (handleClick) handleClick()
            }}
            className={cx(styles.container, classNames, styles[type])}
        >
            <header>
                <p>Sheira-coins:</p>
                <div className={styles.coins}>
                    <Image
                        src="/svg/star-coin.svg"
                        alt="start-coin"
                        width={22}
                        height={22}
                        unoptimized
                    />
                    <p>{coins}</p>
                </div>
            </header>
            <p>{about}</p>
        </div>
    )
}
