import Image from "next/image"

import type { TButtonCircleGradient } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonCircleGradient: TButtonCircleGradient = ({
    classNames,
    handleClick,
    disabled,
    type,
    icon,
    size,
    loading,
}) => {
    return (
        <div
            className={cx(
                styles.circleGradient,
                styles[type],
                disabled && styles.disabled,
                classNames,
            )}
            onClick={() => {
                handleClick ? handleClick() : null
            }}
            data-circle-gradient
        >
            <Image
                src={loading ? "/svg/loading-03.svg" : icon}
                alt="icon"
                width={size || 40}
                height={size || 40}
                data-loading-image={loading}
            />
        </div>
    )
}
