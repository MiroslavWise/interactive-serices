import { motion } from "framer-motion"

import type { TContentCheckingEmail } from "../../types"

import styles from "../styles/style.module.scss"

export const ContentCheckingEmail: TContentCheckingEmail = ({ setType }) => {
  
  return (
    <motion.div
    className={styles.content}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    >
      <section className={styles.Register}>
        <p>Не получили email?</p>
        <a onClick={() => setType("ForgotPassword")}> Отправить еще раз</a>
      </section>
  </motion.div>
  )
}