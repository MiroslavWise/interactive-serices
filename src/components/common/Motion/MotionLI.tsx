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
    const handleClick = () => {
        if (onClick) onClick()
    }

    return (
        <motion.li
            className={cx(classNames)}
            variants={notY ? motionItemOnOpacity : motionItemOnOpacityY}
            onClick={handleClick}
            ref={ref}
            id={id}
            {...data}
        >
            {children}
        </motion.li>
    )
}
