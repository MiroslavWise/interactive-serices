"use client"

<<<<<<< HEAD
=======
import { useState } from "react"
>>>>>>> 5164c6c2a27b19d7f249912d4bee7a14df8e5110
import Image from "next/image"
import { isMobile } from "react-device-detect"

import type { TSignPopup } from "./types"

import { HeaderModal } from "./components/HeaderModal"
import { ContentSignUp } from "./components/ContentSignUp"
import { ContentSignIn } from "./components/ContentSignIn"
import { ContentForgotPassword } from "./components/ContentForgotPassword"
import { ContentFirstLoginQR } from "./components/ContentFirstLoginQR"
import { ContentOtpCode } from "./components/ContentOtpCode"

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
  return (
    isMobile ? (
      <>
        <div className={`${styles.overviewMobile} ${visible ? styles.visible : ""}`}>
          <div className={styles.contentMobile}>
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
          <Glasses />
        </div>
      </>
    ) : (
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
                type === "SignIn" ? <ContentSignIn setType={setType} /> : null
              }
              {
                type === "SignUp" ? <ContentSignUp setType={setType} /> : null
              }
              {
                type === "ForgotPassword" ? <ContentForgotPassword setType={setType} /> : null
              }
            </div>
            <Glasses />
          </div>
        </div>
      </>
    )
  )
}

export default SignPopup