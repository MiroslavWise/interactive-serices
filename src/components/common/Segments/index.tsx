import { motion } from "framer-motion";

import type { TSegments } from "./types";

import styles from "./segments.module.scss";
import { borderClassNames } from "@/helpers";

export const Segments: TSegments = ({ values, active, setActive, type }) => {
  return (
    <div className={styles.container}>
      {
        values.map((item, index) => (
          <motion.div
            key={item?.value}
            onClick={() => setActive(item)}
            className={`${styles.button} ${styles[type]} ${active.value === item.value ? styles.active : ''} ${active.value !== item.value ? styles[borderClassNames(values.indexOf(active), index, values.length)] : ''}`}
          >
            <p>{item.label}</p>
          </motion.div>
        ))
      }
    </div>
  )
}