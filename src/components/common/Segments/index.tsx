import { motion } from "framer-motion"

import type { TSegments } from "./types"

import { borderClassNames } from "@/helpers"
import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const Segments: TSegments = ({ values, active, setActive, type }) => {
  return (
    <div className={styles.container}>
      {
        values.map((item, index) => (
          <motion.div
            key={item?.value}
            onClick={() => setActive(item)}
            className={cx(styles.button, styles[type], active.value === item.value && styles.active, active.value !== item.value && styles[borderClassNames(values.indexOf(active), index, values.length)])}
          >
            <p>{item.label}</p>
          </motion.div>
        ))
      }
    </div>
  )
}