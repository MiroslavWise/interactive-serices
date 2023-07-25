import { motion } from "framer-motion"

import type { TMotion } from "./types/types"

import { motionItemOnOpacityY } from "@/lib/motion"
import { cx } from "@/lib/cx"

export const MotionLI: TMotion = ({ children, classNames, onClick }) => {

  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <motion.li
      className={cx(classNames)}
      variants={motionItemOnOpacityY}
      onClick={handleClick}
    >
      {children}
    </motion.li>
  )
}