import Image from "next/image"

import type { TCircleImageHeader } from "../types/types"

import styles from "../styles/image.module.scss"

export const CircleImageHeader: TCircleImageHeader = ({ src }) => {
    return (
        <div className={styles.bigCircle}>
            <div className={styles.middleCircle}>
                <Image src={src} alt={src} width={35} height={35} unoptimized />
            </div>
        </div>
    )
}
