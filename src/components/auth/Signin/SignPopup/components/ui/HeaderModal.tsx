import { type ReactNode, useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import type { TTypeSign } from "../../types"
import type { THeaderModal } from "./types/types"

import { LogoSheira } from "./components/LogoSheira"
import { CircleImageHeader } from "./components/CircleImageHeader"
import { MotionSectionOpacity } from "@/components/common/Motion"

import { cx } from "@/lib/cx"

import styles from "../styles/style.module.scss"

export const HeaderModal: THeaderModal = ({ type, email }) => {
  const content: { h3: string, p: string } | null = useMemo(() => {
    if (type === null || type === "SelectVerification") {
      return null
    }
    return {
      SignIn: {
        h3: "Войдите в свой аккаунт",
        p: "С возвращением! Пожалуйста, введите свои данные ниже",
      },
      SignUp: {
        h3: "Создать аккаунт",
        p: "Зарегистрируйтесь в Sheira и размещайте свои предложения на карте",
      },
      ForgotPassword: {
        h3: "Забыли пароль?",
        p: "Не беспокойтесь, мы вышлем вам инструкции по сбросу",
      },
      PersonalEntry: {
        h3: "Личные данные",
        p: "Пожалуйста, введите свои данные для создания профиля",
      },
      OtpCode: {
        h3: "Проверьте свой Authenticator",
        p: "Код находится в самом приложении, и имеет срок службы",
      },
      FirstLoginQR: {
        h3: "Добавьте свой Authenticator",
        p: "Отсканируйте QR-код или скопируйте код ниже и вставьте в поле ввода",
      },
      CheckingEmail: {
        h3: "Проверьте свой email",
        p: `мы отправили код подтверждения на ${email}`
      },
      ResetPassword: {
        h3: "Установить новый пароль",
        p: "Ваш новый пароль должен отличаться от ранее использовавшихся паролей.",
      },
      CodeVerificationTelegram: {
        h3: "Проверьте свой Телеграм",
        p: `Мы отправили код подтверждения на номер ${email}`
      },
    }[type]
  }, [type, email])

  const srcImage: string | null = useMemo(() => {
    if (type === null || ["PersonalEntry", "SignUp", "SignIn", "SelectVerification", "ForgotPassword"].includes(type!)) {
      return null
    }
    return {
      CheckingEmail: "/svg/email.svg",
      CodeVerificationTelegram: "/svg/telegram.svg",
      OtpCode: "/icons/fill/google.svg",
      FirstLoginQR: "/icons/fill/google.svg",
      ResetPassword: "/svg/key.svg",
    }[type as Exclude<TTypeSign, "ForgotPassword" | "PersonalEntry" | "SelectVerification" | "SignUp" | "SignIn" | null>]
  }, [type])

  return (
    <header className={cx(styles.header, isMobile && styles.mobile)}>
      {
        ["SignIn", "SignUp", "ForgotPassword", "PersonalEntry"].includes(type!)
          ? (
            <>
              <LogoSheira />
              <MotionSectionOpacity>
                <h3>{content?.h3}</h3>
                <p>{content?.p}</p>
              </MotionSectionOpacity>
            </>
          ) : null
      }
      {
        ["OtpCode", "FirstLoginQR", "CheckingEmail", "ResetPassword"].includes(type!)
          ? (
            <>
              <div className={styles.headerOtpCode}>
                <CircleImageHeader
                  src={srcImage!}
                />
              </div>
              <MotionSectionOpacity>
                <h3>{content?.h3}</h3>
                <p>{content?.p}</p>
              </MotionSectionOpacity>
            </>
          ) : null
      }
      {
        type === "SelectVerification"
          ? (
            <div className={styles.headerSelect}>
              <Image
                src="/svg/verification.svg"
                alt="ver"
                height={160}
                width={160}
              />
              <MotionSectionOpacity><h3>Для авторизации я хочу использовать свой</h3></MotionSectionOpacity>
            </div>
          ) : null
      }
    </header>
  )
}