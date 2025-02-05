"use client"

import { ReactNode } from "react"

import { EnumSign } from "@/types/enum"

import HeaderAuth from "./components/Header"
import { ButtonClose } from "@/components/common"
import ContentSignIn from "./components/ContentSignIn"
import { ContentSignUp } from "./components/ContentSignUp"
import { ContentCurrentUser } from "./components/ContentCurrentUser"
import { ContentCreatePassword } from "./components/ContentCreatePassword"
import { ContentForgotPassword } from "./components/ContentForgotPassword"
import { ContentExistingAccount } from "./components/ContentExistingAccount"
import { ContentCodeVerification } from "./components/ContentCodeVerification"
import { ContentInformationEmailReset } from "./components/ContentInformationEmailReset"
import { ContentInformationCreateAccount } from "./components/ContentInformationCreateAccount"

import { cx } from "@/lib/cx"
import { useStatusAuth } from "@/helpers/use-status-auth"
import { dispatchCloseModalAuth, EStatusAuth, useModalAuth } from "@/store"

const OBJ: Record<EnumSign, ReactNode> = {
  [EnumSign.NumberConfirmation]: null,
  [EnumSign.SignIn]: <ContentSignIn />,
  [EnumSign.SignUp]: <ContentSignUp />,
  [EnumSign.CurrentUser]: <ContentCurrentUser />,
  [EnumSign.ResetPassword]: <ContentCreatePassword />,
  [EnumSign.ForgotPassword]: <ContentForgotPassword />,
  [EnumSign.CreatePassword]: <ContentCreatePassword />,
  [EnumSign.ExistingAccount]: <ContentExistingAccount />,
  [EnumSign.CodeVerification]: <ContentCodeVerification />,
  [EnumSign.InformationEmailReset]: <ContentInformationEmailReset />,
  [EnumSign.InformationCreateAccount]: <ContentInformationCreateAccount />,
}

/** Модальное окно авторизации */
function ModalSign() {
  const statusAuth = useStatusAuth()
  const type = useModalAuth(({ type }) => type)
  const visible = useModalAuth(({ visible }) => visible)

  const component = type && OBJ.hasOwnProperty(type!) ? OBJ[type!] : null

  return (
    <div
      className={cx(
        "fixed transition-opacity inset-0 w-full h-full bg-translucent md:p-10 flex flex-col items-center max-md:p-0 max-md:!pt-0 max-md:justify-end",
        visible ? "z-[1999] visible opacity-100" : "-z-10 opacity-0 invisible",
        statusAuth === EStatusAuth.AUTHORIZED && "hidden",
      )}
    >
      <section className="bg-BG-second rounded-t-3xl rounded-b-none max-md:overflow-hidden max-md:min-h-20 md:rounded-2 relative w-full h-fit max-h-full max-md:!rounded-none max-md:!p-0 max-md:h-full max-w-[30.625rem]">
        <ButtonClose
          onClick={dispatchCloseModalAuth}
          className="!top-0 !right-0 md:!-right-1 !translate-x-0 md:!translate-x-full max-md:!bg-transparent max-md:!border-none w-12 aspect-square h-12"
        />
        <ul className="scroll-no overflow-x-hidden overflow-y-auto p-0 pb-10 w-full gap-8 h-full flex flex-col items-center z-[2] max-md:relative max-md:gap-[1.875rem]">
          <HeaderAuth />
          {component}
        </ul>
      </section>
    </div>
  )
}

ModalSign.displayName = "ModalSign"
export default ModalSign
