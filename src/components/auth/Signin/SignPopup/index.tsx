"use client"

import { useState, useMemo, ReactNode } from "react"
import { isMobile } from "react-device-detect"

import type { IResetEmailData } from "./components/ui/types/types"

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
import { ButtonClose } from "@/components/common/Buttons"

import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { useAuth } from "@/store/hooks/useAuth"
import { cx } from "@/lib/cx"

import styles from "@/components/auth/Signin/SignPopup/styles/style.module.scss"

export function SignPopup() {
  const { isAuth } = useAuth()
  const [valueEmail, setValueEmail] = useState<IResetEmailData>({
    email: "",
    password_reset_expires: null,
    password_reset_token: "",
  })
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
      CodeVerification: <ContentCodeVerification typeVerification={typeVerification} valueEmail={valueEmail} />,
      ResetPassword: <ContentResetPassword />,
    }[type]
  }, [type, setValueSecret, valueSecret, setValueEmail, typeVerification, valueEmail])

  return (
    (!isAuth || type === "PersonalEntry") ? (
      (isMobile) ? (
        <div className={cx(styles.overviewMobile, visible && styles.visible)}>
          <div className={styles.contentMobile}>
            <HeaderModal email={valueEmail.email} typeVerification={typeVerification} />
            {content}
          </div>
          <Glasses />
        </div>
      ) : (
        <div className={cx(styles.overlay, visible && styles.visible)}>
          <div className={styles.modal}>
            <ButtonClose
              onClick={() => setVisibleAndType({ visible: false, type: type })}
              position={{
                right: 12,
                top: 12,
              }}
            />
            <div className={styles.content}>
              <HeaderModal email={valueEmail.email} typeVerification={typeVerification} />
              {content}
            </div>
            <Glasses />
          </div>
        </div>
      )
    ) : null
  )
}