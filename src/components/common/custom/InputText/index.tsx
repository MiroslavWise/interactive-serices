import type { TCustomInputText } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const CustomInputText: TCustomInputText = ({
    placeholder,
    classNames,
    onChange,
}) => {
    function onChanges(value: any) {
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div className={cx(styles.container, classNames)}>
            <input
                type="text"
                placeholder={placeholder}
                onChange={(event) => onChanges(event?.target?.value)}
            />
        </div>
    )
}
