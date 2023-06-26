import { motion } from "framer-motion";

import type { TSegments } from "./types";

import { borderClassnames } from 'lib/functions/classNames';

import styles from './style.module.scss'

export const Segments: TSegments = ({ values, active, setActive }) => {

        return (
                <div className={styles.container}>
                        {
                                values.map((item, index) => (
                                        <motion.div
                                                onClick={() => setActive(item)}
                                                className={`${styles.button} ${active.value === item.value ? styles.active : ''} ${active.value !== item.value ? styles[borderClassnames(values.indexOf(active), index, values.length)] : ''}`}
                                        >
                                                <p>{item.label}</p>
                                        </motion.div>
                                ))
                        }
                </div>
        )
}