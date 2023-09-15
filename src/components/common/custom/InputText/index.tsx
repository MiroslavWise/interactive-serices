import type { TCustomInputText } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const CustomInputText: TCustomInputText = ({
    placeholder,
    classNames,
}) => {
    return (
        <div className={cx(styles.container, classNames)}>
            <input type="text" placeholder={placeholder} />
        </div>
    )
}
