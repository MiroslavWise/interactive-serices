"use client"

import HeaderAuth from "./components/Header"
import { ContentSignIn } from "./components/ContentSignIn"
import { ContentSignUp } from "./components/ContentSignUp"
import { ContentCurrentUser } from "./components/ContentCurrentUser"
import { ContentCreatePassword } from "./components/ContentCreatePassword"
import { ContentForgotPassword } from "./components/ContentForgotPassword"
import { ContentExistingAccount } from "./components/ContentExistingAccount"
import { ContentCodeVerification } from "./components/ContentCodeVerification"
import { ContentInformationEmailReset } from "./components/ContentInformationEmailReset"
import { ContentInformationCreateAccount } from "./components/ContentInformationCreateAccount"

import { useModalAuth } from "@/store"

function ModalSign() {
  const type = useModalAuth(({ type }) => type)

  return (
    <ul>
      <HeaderAuth />
      {type === "SignIn" ? (
        <ContentSignIn />
      ) : type === "SignUp" ? (
        <ContentSignUp />
      ) : type === "CodeVerification" ? (
        <ContentCodeVerification />
      ) : type === "ForgotPassword" ? (
        <ContentForgotPassword />
      ) : ["ResetPassword", "CreatePassword"].includes(type!) ? (
        <ContentCreatePassword />
      ) : type === "ExistingAccount" ? (
        <ContentExistingAccount />
      ) : type === "InformationEmailReset" ? (
        <ContentInformationEmailReset />
      ) : type === "InformationCreateAccount" ? (
        <ContentInformationCreateAccount />
      ) : type === "CurrentUser" ? (
        <ContentCurrentUser />
      ) : null}
    </ul>
  )
}

ModalSign.displayName = "ModalSign"
export default ModalSign
