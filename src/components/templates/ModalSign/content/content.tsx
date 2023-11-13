"use client"

import { memo, useState } from "react"

import type { IResetEmailData } from "../types/types"

import { HeaderAuth } from "../components/Header"
import { ContentSignIn } from "../components/ContentSignIn"
import { ContentSignUp } from "../components/ContentSignUp"
import { ContentOtpCode } from "../components/ContentOtpCode"
import { ContentFirstLoginQR } from "../components/ContentFirstLoginQR"
import { ContentResetPassword } from "../components/ContentResetPassword"
import { ContentForgotPassword } from "../components/ContentForgotPassword"
import { ContentCodeVerification } from "../components/ContentCodeVerification"
import { ContentSelectVerification } from "../components/ContentSelectVerification"

import { useModalAuth } from "@/store/hooks"

export const Content = memo(function Content() {
    const { type } = useModalAuth()
    const [valueEmail, setValueEmail] = useState<IResetEmailData>({
        email: "",
        password_reset_expires: null,
        password_reset_token: "",
    })
    const [valueSecret, setValueSecret] = useState<{
        url: string
        secret: string
    }>({ url: "", secret: "" })
    const [typeVerification, setTypeVerification] = useState<
        "email" | "phone" | null
    >("email")

    return (
        <>
            <HeaderAuth {...{ email: valueEmail.email, typeVerification }} />
            {type === "SignIn" ? (
                <ContentSignIn {...{ setValueSecret }} />
            ) : type === "SignUp" ? (
                <ContentSignUp />
            ) : type === "CodeVerification" ? (
                <ContentCodeVerification
                    {...{ typeVerification, valueEmail }}
                />
            ) : type === "FirstLoginQR" ? (
                <ContentFirstLoginQR {...{ valueSecret }} />
            ) : type === "ForgotPassword" ? (
                <ContentForgotPassword {...{ setValueEmail }} />
            ) : type === "OtpCode" ? (
                <ContentOtpCode />
            ) : type === "ResetPassword" ? (
                <ContentResetPassword />
            ) : type === "SelectVerification" ? (
                <ContentSelectVerification
                    {...{ typeVerification, setTypeVerification }}
                />
            ) : null}
        </>
    )
})
