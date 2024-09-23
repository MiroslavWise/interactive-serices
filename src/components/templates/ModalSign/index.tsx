"use client"

import { EnumSign } from "@/types/enum"

import HeaderAuth from "./components/Header"
import ContentSignIn from "./components/ContentSignIn"
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
    <ul className="auth-ul overflow-x-hidden overflow-y-auto p-0 pb-10 w-full gap-8 h-full flex flex-col items-center z-[2] max-md:relative max-md:gap-[1.875rem]">
      <HeaderAuth />
      {type === EnumSign.SignIn ? (
        <ContentSignIn />
      ) : type === EnumSign.SignUp ? (
        <ContentSignUp />
      ) : type === EnumSign.CodeVerification ? (
        <ContentCodeVerification />
      ) : type === EnumSign.ForgotPassword ? (
        <ContentForgotPassword />
      ) : [EnumSign.ResetPassword, EnumSign.CreatePassword].includes(type!) ? (
        <ContentCreatePassword />
      ) : type === EnumSign.ExistingAccount ? (
        <ContentExistingAccount />
      ) : type === EnumSign.InformationEmailReset ? (
        <ContentInformationEmailReset />
      ) : type === EnumSign.InformationCreateAccount ? (
        <ContentInformationCreateAccount />
      ) : type === EnumSign.CurrentUser ? (
        <ContentCurrentUser />
      ) : null}
    </ul>
  )
}

ModalSign.displayName = "ModalSign"
export default ModalSign
