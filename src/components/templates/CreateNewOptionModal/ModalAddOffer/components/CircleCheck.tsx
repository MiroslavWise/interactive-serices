import Image from "next/image"

import type { TCircleCheck } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/circle-check.module.scss"

export const CircleCheck: TCircleCheck = ({ type }) => {
    return (
        <div className={cx(styles.container, styles[type])}>
            {type === "finished" ? (
                <Image
                    src="/svg/check-icon-tick.svg"
                    alt="check-icon-tick"
                    height={26}
                    width={26}
                />
            ) : null}
            {["in_process", "not_active"].includes(type) ? (
                <div className={styles.circle} />
            ) : null}
        </div>
    )
}
