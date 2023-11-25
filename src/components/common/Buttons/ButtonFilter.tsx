import Image from "next/image"

import type { TButtonFilter } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonFilter: TButtonFilter = ({
    label,
    classNames,
    handleClick,
    disabled,
    active,
}) => {
    const click = () => {
        if (handleClick) {
            handleClick()
        }
    }
    return (
        <div
            className={cx(
                styles.buttonFillGradient,
                active && styles.active,
                disabled && "disabled",
                classNames,
            )}
            onClick={click}
        >
            <span>{label}</span>
            <div
                className={`${styles.filterAndClose} ${
                    active ? styles.active : ""
                }`}
            >
                <Image
                    src={
                        active
                            ? "/svg/x-close-white.svg"
                            : "/svg/sliders-white.svg"
                    }
                    alt="filter"
                    width={24}
                    height={24}
                    unoptimized
                />
            </div>
        </div>
    )
}
