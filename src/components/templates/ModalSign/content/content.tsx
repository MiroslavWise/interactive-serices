"use client"

import { memo, useState } from "react"

import { HeaderAuth } from "../components/Header"
import { ContentSignIn } from "../components/ContentSignIn"
import { ContentSignUp } from "../components/ContentSignUp"
import { ContentOtpCode } from "../components/ContentOtpCode"
import { ContentCurrentUser } from "../components/ContentCurrentUser"
import { ContentFirstLoginQR } from "../components/ContentFirstLoginQR"
import { NumberConfirmation } from "../components/NumberConfirmation"
import { ContentCreatePassword } from "../components/ContentCreatePassword"
import { ContentForgotPassword } from "../components/ContentForgotPassword"
import { ContentExistingAccount } from "../components/ContentExistingAccount"
import { ContentCodeVerification } from "../components/ContentCodeVerification"
import { ContentInformationEmailReset } from "../components/ContentInformationEmailReset"
import { ContentInformationCreateAccount } from "../components/ContentInformationCreateAccount"

import { useModalAuth } from "@/store/hooks"

export const Content = memo(function Content() {
    const type = useModalAuth(({ type }) => type)
    const [valueSecret, setValueSecret] = useState<{
        url: string
        secret: string
    }>({ url: "", secret: "" })

    return (
        <ul>
            <HeaderAuth />
            {type === "SignIn" ? (
                <ContentSignIn {...{ setValueSecret }} />
            ) : type === "SignUp" ? (
                <ContentSignUp />
            ) : type === "CodeVerification" ? (
                <ContentCodeVerification />
            ) : type === "FirstLoginQR" ? (
                <ContentFirstLoginQR {...{ valueSecret }} />
            ) : type === "ForgotPassword" ? (
                <ContentForgotPassword />
            ) : type === "OtpCode" ? (
                <ContentOtpCode />
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
})
