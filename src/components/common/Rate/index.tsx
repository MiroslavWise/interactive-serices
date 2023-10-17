import { useId } from "react"
import Image from "next/image"

import type { TRate } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

function createArray(length: number, count: number): boolean[] {
    const fill = []
    for (let i = 0; i < count; i++) {
        fill.push(i <= length - 1)
    }
    return fill
}

export const Rate: TRate = ({ rate, className, size }) => {
    const id = useId()
    return (
        <ul
            className={cx(styles.container, className)}
            style={{ height: size || 20 }}
        >
            {createArray(Number(rate) / 2, 5).map((bool, index) => (
                <li
                    key={`${index}_rate_${id}`}
                    style={{ width: size || 20, height: size || 20 }}
                >
                    <Image
                        src={
                            bool
                                ? "/svg/stars/star-fill.svg"
                                : "/svg/stars/star-outline.svg"
                        }
                        alt="stars"
                        width={size || 20}
                        height={size || 20}
                    />
                </li>
            ))}
        </ul>
    )
}
