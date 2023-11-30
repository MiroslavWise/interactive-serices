"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import type { TMotion } from "./types/types"

import { cx } from "@/lib/cx"
import { motionOpacity, motionOpacityY } from "@/lib/motion"

export const MotionUL: TMotion = ({ children, classNames, id, data, ref, notY }) => {
    return (
        <motion.ul
            className={cx(classNames)}
            variants={notY ? motionOpacity : motionOpacityY}
            initial="hidden"
            animate="visible"
            data-mobile-ul={isMobile}
            id={id}
            ref={ref}
            {...data}
        >
            {children}
        </motion.ul>
    )
}
