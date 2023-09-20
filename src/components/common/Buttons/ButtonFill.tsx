"use client"

import { type TButtonPropsFill } from "./types/types"

import { cx } from "@/lib/cx"

export const ButtonFill: TButtonPropsFill = ({
    label,
    classNames,
    handleClick,
    disabled,
    type,
    submit,
    shadow,
    small,
    suffix,
    prefix,
}) => {
    function click() {
        if (disabled) return
        if (handleClick && !submit) {
            handleClick()
        }
    }
    return (
        <button
            className={cx(
                "button-fill",
                type || "primary",
                disabled && "disabled",
                classNames,
                shadow && "shadow",
                small && "small",
            )}
            onClick={click}
            type={submit || "button"}
        >
            {prefix ? prefix : null}
            <span>{label}</span>
            {suffix ? suffix : null}
        </button>
    )
}
