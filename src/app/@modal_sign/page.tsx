"use client"

import { useState, useMemo, ReactNode } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"

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
} from "@/components/auth/Signin/SignPopup/components"
import { Glasses } from "@/components/auth/Signin/SignPopup/components/ui/components/Glasses"

import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { useAuth } from "@/store/hooks/useAuth"
import { cx } from "@/lib/cx"

import styles from "@/components/auth/Signin/SignPopup/styles/style.module.scss"

export default function ModalSign() {
  const { isAuth } = useAuth()
  const [valueEmail, setValueEmail] = useState("")
  const [valueSecret, setValueSecret] = useState<{ url: string, secret: string }>({ url: "", secret: "" })
  const [typeVerification, setTypeVerification] = useState<"email" | "phone" | null>("email")
  const { type, visible, setVisibleAndType } = useVisibleAndTypeAuthModal()

  const content: ReactNode | null = useMemo(() => {
    if (type === null) return null
    return {
      SignIn: <ContentSignIn setValueSecret={setValueSecret} />,
      SignUp: <ContentSignUp />,
      ForgotPassword: <ContentForgotPassword setValueEmail={setValueEmail} />,
      FirstLoginQR: <ContentFirstLoginQR valueSecret={valueSecret} />,
      OtpCode: <ContentOtpCode />,
      PersonalEntry: <ContentPersonalEntry />,
      SelectVerification: <ContentSelectVerification typeVerification={typeVerification} setTypeVerification={setTypeVerification} />,
      CodeVerification: <ContentCodeVerification typeVerification={typeVerification} />,
      ResetPassword: <ContentResetPassword />,
    }[type]
  }, [type, setValueSecret, valueSecret, setValueEmail, typeVerification])

  return (
    (!isAuth || type === "PersonalEntry") ? (
      isMobile ? (
        <div className={cx(styles.overviewMobile, visible && styles.visible)}>
          <div className={styles.contentMobile}>
            <HeaderModal email={valueEmail} typeVerification={typeVerification} />
            {content}
          </div>
          <Glasses />
        </div>
      ) : (
        <div className={cx(styles.overlay, visible && styles.visible)}>
          <div className={styles.modal}>
            <div
              className={styles.close}
              onClick={() => setVisibleAndType({ visible: false, type: type })}
            >
              <Image
                src="/svg/x-close.svg"
                alt="x"
                width={14}
                height={14}
              />
            </div>
            <div className={styles.content}>
              <HeaderModal email={valueEmail} typeVerification={typeVerification} />
              {content}
            </div>
            <Glasses />
          </div>
        </div>
      )
    ) : null
  )
}