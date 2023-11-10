import Image from "next/image"

import type { TButtonSelection } from "../types/types"

import styles from "../styles/button-selection.module.scss"

export const ButtonSelection: TButtonSelection = (props) => {
    const { active, label, onClick, image } = props ?? {}
    return (
        <div
            className={styles.container}
            data-active={active}
            onClick={onClick}
        >
            <div className={styles.checkBox}>
                <span />
            </div>
            <div className={styles.contentIconType}>
                <Image src={image} alt={image} width={56} height={56} />
                <h3>{label}</h3>
            </div>
        </div>
    )
}
