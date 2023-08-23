import { motion } from "framer-motion"

import type { TSegments } from "./types"

import { borderClassNames } from "@/helpers"
import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const Segments: TSegments = ({ values, active, setActive, type, classNames, ref = null, id }) => {
  return (
    <div className={cx(styles.container, classNames)} ref={ref}>
      {
        values.map((item, index) => (
          <motion.div
            id={id}
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