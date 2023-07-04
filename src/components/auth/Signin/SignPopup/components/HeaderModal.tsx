import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import type { THeaderModal } from "../types"

import styles from "./styles/style.module.scss"

const Logo = () => (
  <Image
    src="/logo/wordmark.svg"
    alt="sheira"
    width={isMobile ? 119 : 140}
    height={isMobile ? 31 : 37}
  />
)

const MotionSection = ({ children }: { children: ReactNode }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >{children}</motion.section>
)

export const HeaderModal: THeaderModal = ({ type }) => {

  return (
    <header className={`${styles.header} ${isMobile ? styles.mobile : ""}`}>
      {
        ["SignIn", "SignUp", "ForgotPassword", "PersonalEntry"].includes(type!)
          ? (
            <>
              <Logo />
              <MotionSection>
                {
                  type === "SignIn"
                    ? (
                      <>
                        <h3>Войдите в свой аккаунт</h3>
                        <p>С возвращением! Пожалуйста, введите свои данные ниже</p>
                      </>
                    ) : null
                }
                {
                  type === "SignUp"
                    ? (
                      <>
                        <h3>Создать аккаунт</h3>
                        <p>Зарегистрируйтесь в Sheira и размещайте свои предложения на карте</p>
                      </>
                    ) : null
                }
                {
                  type === "ForgotPassword"
                    ? (
                      <>
                        <h3>Забыли пароль?</h3>
                        <p>Не беспокойтесь, мы вышлем вам инструкции по сбросу</p>
                      </>
                    ) : null
                }
                {
                  type === "PersonalEntry"
                    ? (
                      <>
                        <h3>Личные данные</h3>
                        <p>Пожалуйста, введите свои данные для создания профиля</p>
                      </>
                    ) : null
                }
              </MotionSection>
            </>
          ) : null
      }
      {
        type === "OtpCode"
          ? (
            <>
              <div className={styles.headerOtpCode}>
                <Image
                  src="/icons/fill/google.svg"
                  alt="google"
                  width={38.5}
                  height={38.5}
                />
              </div>
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Проверьте свой Authenticator</h3>
                <p>Код находится в самом приложении, и имеет срок службы</p>
              </motion.section>
            </>
          ) : null
      }
      {
        type === "FirstLoginQR"
          ? (
            <>
              <div className={styles.headerOtpCode}>
                <Image
                  src="/icons/fill/google.svg"
                  alt="google"
                  width={38.5}
                  height={38.5}
                />
              </div>
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Добавьте свой Authenticator</h3>
                <p>Отсканируйте QR-код или скопируйте код ниже и вставьте в поле ввода</p>
              </motion.section>
            </>
          ) : null
      }
    </header>
  )
}