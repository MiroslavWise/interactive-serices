"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import type { TSignPopup } from "./types"

import { HeaderModal } from "./components/HeaderModal"
import { ContentSignUp } from "./components/ContentSignUp"
import { ContentSignIn } from "./components/ContentSignIn"
import { ContentForgotPassword } from "./components/ContentForgotPassword"

import styles from "./sign-popup.module.scss"

const Glasses = () => (
  <>
    <span className={styles.orangeCircle} />
    <span className={styles.purpleCircle} />
    <span className={styles.lightBlueCircle} />
  </>
)

const SignPopup: TSignPopup = ({ visible, type, setVisible, setType }) => {
  return (
    isMobile ? (
      <>
        <div className={`${styles.overviewMobile} ${visible ? styles.visible : ""}`}>
          <div className={styles.contentMobile}>
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