"use client"

import { motion } from "framer-motion"
import { type TButtonPropsFill } from "./types/types"

import { cx } from "@/lib/cx"
import { itemVariantsForMenu } from "@/lib/motion"

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
        <motion.button
            className={cx(
                "button-fill",
                type || "primary",
                disabled && "disabled",
                classNames,
                shadow && "shadow",
                small && "small",
            )}
            variants={itemVariantsForMenu}
            onClick={click}
            type={submit || "button"}
        >
            {prefix ? prefix : null}
            <span>{label}</span>
            {suffix ? suffix : null}
        </motion.button>
    )
}
