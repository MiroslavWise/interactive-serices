import Image from "next/image"

import type { TButtonSelection } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonSelection: TButtonSelection = ({
    active,
    label,
    onClick,
    image,
}) => {
    return (
        <div
            className={cx(
                styles.containerButtonSelection,
                active && styles.active,
            )}
            onClick={onClick}
        >
            <div className={cx(styles.checkBox, active && styles.active)}>
                <span />
            </div>
            <div className={styles.contentIconType}>
                <Image src={image} alt={image} width={56} height={56} />
                <h3>{label}</h3>
            </div>
        </div>
    )
}
