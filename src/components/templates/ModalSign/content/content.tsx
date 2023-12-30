"use client"

import { memo, useState } from "react"

import { HeaderAuth } from "../components/Header"
import { ContentSignIn } from "../components/ContentSignIn"
import { ContentSignUp } from "../components/ContentSignUp"
import { ContentOtpCode } from "../components/ContentOtpCode"
import { ContentFirstLoginQR } from "../components/ContentFirstLoginQR"
import { ContentCreatePassword } from "../components/ContentCreatePassword"
import { ContentForgotPassword } from "../components/ContentForgotPassword"
import { ContentCodeVerification } from "../components/ContentCodeVerification"

import { useModalAuth } from "@/store/hooks"
import { ContentExistingAccount } from "../components/ContentExistingAccount"

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
            ) : null}
        </ul>
    )
})
