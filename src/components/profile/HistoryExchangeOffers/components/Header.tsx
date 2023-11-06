import type { THeader } from "./types/types"

import { Segments } from "@/components/common/Segments"

import { SEGMENTS } from "../constants"

import styles from "./styles/style.module.scss"

export const Header: THeader = ({ value, setValue }) => {
    return (
        <header className={styles.containerHeader}>
            <h4>История обмена предложениями</h4>
            <Segments
                type="primary"
                VALUES={SEGMENTS}
                active={value}
                setActive={setValue}
            />
        </header>
    )
}
