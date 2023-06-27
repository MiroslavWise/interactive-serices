import type { TRate } from "./types"

import styles from "./style.module.scss"
import { createArray } from "lib/functions/createArray"
import Image from "next/image"
import { useId } from "react"

export const Rate: TRate = ({ rate }) => {
        const id = useId()
        return (
                <ul className={styles.container}>
                        {
                                createArray(Number(rate)).map((bool, index) => (
                                        <li key={`${index}_rate_${id}`}>
                                                <Image
                                                        src={bool ? "/svg/stars/star-fill.svg" : "/svg/stars/star-outline.svg"}
                                                        alt="stars"
                                                        width={20}
                                                        height={20}
                                                />
                                        </li>
                                ))
                        }
                </ul>
        )
}