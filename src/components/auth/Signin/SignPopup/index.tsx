"use client"

import { useState, useMemo, ReactNode } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import type { TSignPopup } from "./types"

import {
  HeaderModal,
  ContentSignUp,
  ContentSignIn,
  ContentForgotPassword,
  ContentFirstLoginQR,
  ContentOtpCode,
  ContentPersonalEntry,
  ContentResetPassword,
  ContentSelectVerification,
  ContentCodeVerification,
} from "./components"
import { Glasses } from "./components/ui/components/Glasses"

import { useAuth } from "@/store/hooks/useAuth"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

const SignPopup: TSignPopup = ({ visible, type, setVisible, setType }) => {
  const { isAuth } = useAuth()
  const [valueEmail, setValueEmail] = useState("")
  const [valueSecret, setValueSecret] = useState<{ url: string, secret: string }>({ url: "", secret: "" })
  const [typeVerification, setTypeVerification] = useState<"email" | "phone" | null>("email")

  const content: ReactNode | null = useMemo(() => {
    if (type === null) return null
    return {
      SignIn: <ContentSignIn setType={setType} setVisible={setVisible} setValueSecret={setValueSecret} />,
      SignUp: <ContentSignUp setType={setType} />,
      ForgotPassword: <ContentForgotPassword setType={setType} setValueEmail={setValueEmail} />,
      FirstLoginQR: <ContentFirstLoginQR setType={setType} valueSecret={valueSecret} setVisible={setVisible} />,
      OtpCode: <ContentOtpCode setType={setType} setVisible={setVisible} />,
      PersonalEntry: <ContentPersonalEntry setType={setType} setVisible={setVisible} />,
      SelectVerification: <ContentSelectVerification setType={setType} typeVerification={typeVerification} setTypeVerification={setTypeVerification} />,
      CodeVerification: <ContentCodeVerification setType={setType} typeVerification={typeVerification} />,
      ResetPassword: <ContentResetPassword setType={setType} setVisible={setVisible} />,
    }[type]
  }, [type, setType, setVisible, setValueSecret, valueSecret, setValueEmail, typeVerification])

  return (
    (!isAuth || type === "PersonalEntry") ? (
      isMobile ? (
        <div className={cx(styles.overviewMobile, visible && styles.visible)}>
          <div className={styles.contentMobile}>
            <HeaderModal type={type} email={valueEmail} typeVerification={typeVerification} />
            {content}
          </div>
          <Glasses />
        </div>
      ) : (
        <div className={cx(styles.overlay, visible && styles.visible)}>
          <div className={styles.modal}>
            <div
              className={styles.close}
              onClick={() => setVisible(false)}
            >
              <Image
                src="/svg/x-close.svg"
                alt="x"
                width={14}
                height={14}
              />
            </div>
            <div className={styles.content}>
              <HeaderModal type={type} email={valueEmail} typeVerification={typeVerification} />
              {content}
            </div>
            <Glasses />
          </div>
        </div>
      )
    ) : null
  )
}

export default SignPopup