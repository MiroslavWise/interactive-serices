import { motion } from "framer-motion"

import type { TSelectors } from "./types"

import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"
import { itemVariantsForMenu } from "@/lib/motion"

export const Selectors: TSelectors = ({
  options, label, watchField, set, param, register,
}) => {
  const [isOpen, setIsOpen, dropdownRef] = useOutsideClickEvent()

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={styles.container}
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(prev => !prev)}
        className={cx(styles.trigger, isOpen && styles.isOpen)}
      >
        <span className={cx(isOpen && styles.isOpen, watchField && styles.active)}>{watchField ? options.find(item => item.value === watchField)?.label : label}</span>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.35 }}
          style={{ originY: 0.55 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" >
            <path d="M4.41009 6.91076C4.73553 6.58533 5.26317 6.58533 5.5886 6.91076L9.99935 11.3215L14.4101 6.91076C14.7355 6.58533 15.2632 6.58533 15.5886 6.91076C15.914 7.2362 15.914 7.76384 15.5886 8.08928L10.5886 13.0893C10.2632 13.4147 9.73553 13.4147 9.41009 13.0893L4.41009 8.08928C4.08466 7.76384 4.08466 7.2362 4.41009 6.91076Z" fill="var(--primary-500)"/>
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className={cx(isOpen && styles.isOpen)}
      >
        {
          options.map(item => (
            <motion.li
              key={`${item.value}_${label}`}
              variants={itemVariantsForMenu}
              onClick={() => {
                set(param, item.value)
                setIsOpen(false)
              }}
            >
              <span>{item.label}</span>
            </motion.li>
          ))
        }
      </motion.ul>
    </motion.nav>
  )
  return (
    <div
      className={styles.container}
      {...register}
      ref={dropdownRef}
    >
      <div
        className={cx(styles.trigger, isOpen && styles.isOpen)}
        onClick={() => {
          setIsOpen(prev => !prev)
        }}
      >
        <span
          className={cx(isOpen && styles.isOpen, watchField && styles.active)}
        >{watchField ? options.find(item => item.value === watchField)?.label : label}</span>
      </div>
      <ul className={cx(isOpen && styles.isOpen)}>
        {
          options.map(item => (
            <li
              key={`${item.value}_${label}`}
              onClick={() => {
                set(param, item.value)
                setIsOpen(false)
              }}
              className={cx(watchField === item.value && styles.active)}
            >
              <span>{item.label}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}