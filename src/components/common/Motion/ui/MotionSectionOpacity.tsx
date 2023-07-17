import { motion } from "framer-motion"

import { cx } from "@/lib/cx"

import type { TMotionSectionOpacity } from "../types/types"

export const MotionSectionOpacity: TMotionSectionOpacity = ({ children, classNames }) => {

  return (
    <motion.section
      className={cx(Array.isArray(classNames) ? classNames : [])}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  )
}