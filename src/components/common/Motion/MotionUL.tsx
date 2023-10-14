import { motion } from "framer-motion"

import type { TMotion } from "./types/types"

import { motionOpacityY } from "@/lib/motion"
import { cx } from "@/lib/cx"

export const MotionUL: TMotion = ({ children, classNames, id, data }) => {
    return (
        <motion.ul
            className={cx(classNames)}
            variants={motionOpacityY}
            initial="hidden"
            animate="visible"
            id={id}
            {...data}
        >
            {children}
        </motion.ul>
    )
}
