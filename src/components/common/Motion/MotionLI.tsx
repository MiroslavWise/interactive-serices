import { motion } from "framer-motion"

import type { TMotion } from "./types/types"

import { cx } from "@/lib/cx"
import { motionItemOnOpacityY } from "@/lib/motion"

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