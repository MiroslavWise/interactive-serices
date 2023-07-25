import { motion } from "framer-motion"

import type { TMotion } from "./types/types"
import { cx } from "@/lib/cx"
import { motionOpacityY } from "@/lib/motion"

export const MotionUL: TMotion = ({ children, classNames }) => {
  
  return (
    <motion.ul
      className={cx(classNames)}
      variants={motionOpacityY}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.ul>
  )
}