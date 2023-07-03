"use client"

import { useState } from "react"
import Image from "next/image"

import type { TSignPopup } from "./types"

import { HeaderModal } from "./components/HeaderModal"
import { ContentSignUp } from "./components/ContentSignUp"
import { ContentSignIn } from "./components/ContentSignIn"
import { ContentForgotPassword } from "./components/ContentForgotPassword"
import { ContentFirstLoginQR } from "./components/ContentFirstLoginQR"
import { ContentOtpCode } from "./components/ContentOtpCode"

import styles from "./sign-popup.module.scss"

const SignPopup: TSignPopup = ({ visible, type, setVisible, setType }) => {
  const [valueSecret, setValueSecret] = useState<{ url: string, secret: string }>({ url: "", secret: "" })
  return (
    <>
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
            {
              type === "SignIn" ? <ContentSignIn setType={setType} setVisible={setVisible} setValueSecret={setValueSecret} /> : null
            }
            {
              type === "SignUp" ? <ContentSignUp setType={setType} /> : null
            }
            {
              type === "ForgotPassword" ? <ContentForgotPassword setType={setType} /> : null
            }
            {
              type === "FirstLoginQR" ? <ContentFirstLoginQR setType={setType} valueSecret={valueSecret} setVisible={setVisible} /> : null
            }
            {
              type === "OtpCode" ? <ContentOtpCode setType={setType} setVisible={setVisible} /> : null
            }
          </div>
          <div className={styles.orangeCircle} />
          <div className={styles.purpleCircle} />
          <div className={styles.lightBlueCircle} />
        </div>
      </div>
    </>
  )
}

export default SignPopup