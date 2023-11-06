import { motion } from "framer-motion"

import type { TMotion } from "./types/types"

import { cx } from "@/lib/cx"
import { motionItemOnOpacity, motionItemOnOpacityY } from "@/lib/motion"

export const MotionLI: TMotion = ({
    children,
    classNames,
    onClick,
    ref,
    id,
    data,
    notY,
}) => {
    return (
        <motion.li
            className={cx(classNames)}
            variants={notY ? motionItemOnOpacity : motionItemOnOpacityY}
            onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                if (onClick) onClick()
            }}
            ref={ref}
            id={id}
            {...data}
        >
            {children}
        </motion.li>
    )
}
