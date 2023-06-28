import Image from "next/image";
import { motion } from "framer-motion";

import type { THeaderModal } from "../types";

import styles from "./style.module.scss";

export const HeaderModal: THeaderModal = ({ type }) => {

  return (
    <header className={styles.header}>
      {
        type === "SignIn"
          ? (
            <>
              <Image
                src="/logo/wordmark.svg"
                alt="sheira"
                width={140}
                height={37}
              />
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Войдите в свой аккаунт</h3>
                <p>С возвращением! Пожалуйста, введите свои данные ниже.</p>
              </motion.section>
            </>
          ) : null
      }
      {
        type === "SignUp"
          ? (
            <>
              <Image
                src="/logo/wordmark.svg"
                alt="sheira"
                width={140}
                height={37}
              />
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Создать аккаунт</h3>
                <p>Зарегистрируйтесь в Sheira и размещайте свои предложения на карте</p>
              </motion.section>
            </>
          ) : null
      }
      {
        type === "ForgotPassword"
          ? (
            <>
              <Image
                src="/logo/wordmark.svg"
                alt="sheira"
                width={140}
                height={37}
              />
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Забыли пароль?</h3>
                <p>Не беспокойтесь, мы вышлем вам инструкции по сбросу.</p>
              </motion.section>
            </>
          ) : null
      }
    </header>
  )
}