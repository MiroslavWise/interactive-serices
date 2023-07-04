"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import type { TSignPopup } from "./types"

import { HeaderModal } from "./components/HeaderModal"
import { ContentSignUp } from "./components/ContentSignUp"
import { ContentSignIn } from "./components/ContentSignIn"
import { ContentForgotPassword } from "./components/ContentForgotPassword"
import { ContentFirstLoginQR } from "./components/ContentFirstLoginQR"
import { ContentOtpCode } from "./components/ContentOtpCode"
import { ContentPersonalEntry } from "./components/ContentPersonalEntry"

import styles from "./sign-popup.module.scss"

const Glasses = () => (
  <>
    <span className={styles.orangeCircle} />
    <span className={styles.purpleCircle} />
    <span className={styles.lightBlueCircle} />
  </>
)

const SignPopup: TSignPopup = ({ visible, type, setVisible, setType }) => {
  const [valueSecret, setValueSecret] = useState<{ url: string, secret: string }>({ url: "", secret: "" })

  const content = useMemo(() => {
    switch (type) {
      case "SignIn":
        return <ContentSignIn setType={setType} setVisible={setVisible} setValueSecret={setValueSecret} />
      case "SignUp":
        return <ContentSignUp setType={setType} />
      case "ForgotPassword":
        return <ContentForgotPassword setType={setType} />
      case "FirstLoginQR":
        return <ContentFirstLoginQR setType={setType} valueSecret={valueSecret} setVisible={setVisible} />
      case "OtpCode":
        return <ContentOtpCode setType={setType} setVisible={setVisible} />
      case "PersonalEntry":
        return <ContentPersonalEntry setType={setType} setVisible={setVisible} />
      default:
        return null
    }
  }, [type, setType, setVisible, setValueSecret, valueSecret])

  return (
    isMobile ? (
      <div className={`${styles.overviewMobile} ${visible ? styles.visible : ""}`}>
        <div className={styles.contentMobile}>
          <HeaderModal type={type} />
          {content}
        </div>
        <Glasses />
      </div>
    ) : (
      <div className={`${styles.overlay} ${visible ? styles.visible : ""}`}>
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
            <HeaderModal type={type} />
            {content}
          </div>
          <Glasses />
        </div>
      </div>
    )
  )
}

export default SignPopup