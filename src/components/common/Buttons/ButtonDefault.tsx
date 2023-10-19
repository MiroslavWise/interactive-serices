"use client"

import { motion } from "framer-motion"
import { type TButtonPropsDefault } from "./types/types"

import { cx } from "@/lib/cx"
import { itemVariantsForMenu } from "@/lib/motion"

export const ButtonDefault: TButtonPropsDefault = ({
    label,
    handleClick,
    disabled,
    classNames,
    prefix,
    suffix,
    submit,
}) => {
    return (
        <motion.button
            variants={itemVariantsForMenu}
            type={submit || "button"}
            className={cx("button-default", disabled && "disabled", classNames)}
            onClick={handleClick}
        >
            {prefix ? prefix : null}
            <span>{label}</span>
            {suffix ? suffix : null}
        </motion.button>
    )
}
