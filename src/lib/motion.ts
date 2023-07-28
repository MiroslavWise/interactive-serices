import { Variants } from "framer-motion"

export const motionOpacityY: Variants = {
  hidden: { opacity: 0, scale: 0, },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.15,
    },
  },
}

export const motionItemOnOpacityY: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const itemVariantsForMenu: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 }, },
}