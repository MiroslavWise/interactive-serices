import Image from "next/image"
import { useMemo } from "react"

import type { THeaderModal } from "../types/types"
import type { TTypeSign } from "@/store/types/useVisibleAndTypeAuthModalState"

import { LogoSheira } from "./LogoSheira"
import { CircleImageHeader } from "./CircleImageHeader"
import { MotionSectionOpacity } from "@/components/common/Motion"

import { useModalAuth } from "@/store/hooks"

export const HeaderAuth: THeaderModal = (email, typeVerification) => {
    const type = useModalAuth(({ type }) => type)

    const content: { h3: string; p: string } | null = useMemo(() => {
        if (type === null || type === "SelectVerification") {
            return null
        }
        return {
            SignIn: {
                h3: "Войдите в свой аккаунт",
                p: "С возвращением! Пожалуйста, введите свои данные ниже",
            },
            SignUp: {
                h3: "Создать аккаунт",
                p: "Зарегистрируйтесь в Sheira и размещайте свои предложения на карте",
            },
            ForgotPassword: {
                h3: "Забыли пароль?",
                p: "Не беспокойтесь, мы вышлем вам инструкции по сбросу",
            },
            OtpCode: {
                h3: "Проверьте свой Authenticator",
                p: "Код находится в самом приложении, и имеет срок службы",
            },
            FirstLoginQR: {
                h3: "Добавьте свой Authenticator",
                p: "Отсканируйте QR-код или скопируйте код ниже и вставьте в поле ввода",
            },
            ResetPassword: {
                h3: "Установить новый пароль",
                p: "Ваш новый пароль должен отличаться от ранее использовавшихся паролей.",
            },
            CodeVerification: {
                h3:
                    typeVerification === "email"
                        ? "Проверьте свой email"
                        : typeVerification === "phone"
                        ? "Проверьте свой Телеграм"
                        : "",
                p:
                    typeVerification === "email"
                        ? `мы отправили код подтверждения на ${email}`
                        : typeVerification === "phone"
                        ? `Мы отправили код подтверждения на номер ${email}`
                        : "",
            },
        }[type]
    }, [type, email, typeVerification])

    const srcImage: string | null = useMemo(() => {
        if (
            type === null ||
            [
                "SignUp",
                "SignIn",
                "SelectVerification",
                "ForgotPassword",
            ].includes(type!)
        ) {
            return null
        }
        return {
            CodeVerification:
                typeVerification === "email"
                    ? "/svg/email.svg"
                    : typeVerification === "phone"
                    ? "/svg/telegram_selection.svg"
                    : null,
            OtpCode: "/icons/fill/google.svg",
            FirstLoginQR: "/icons/fill/google.svg",
            ResetPassword: "/svg/key.svg",
        }[
            type as Exclude<
                TTypeSign,
                | "ForgotPassword"
                | "SelectVerification"
                | "SignUp"
                | "SignIn"
                | null
            >
        ]
    }, [type, typeVerification])

    return (
        <header>
            {["SignIn", "SignUp", "ForgotPassword"].includes(type!) ? (
                <>
                    <LogoSheira />
                    <MotionSectionOpacity>
                        <h3>{content?.h3}</h3>
                        <p>{content?.p}</p>
                    </MotionSectionOpacity>
                </>
            ) : null}
            {[
                "OtpCode",
                "FirstLoginQR",
                "CodeVerification",
                "ResetPassword",
                "",
            ].includes(type!) ? (
                <>
                    <div data-header-otp-code>
                        <CircleImageHeader src={srcImage!} />
                    </div>
                    <MotionSectionOpacity>
                        <h3>{content?.h3}</h3>
                        <p>{content?.p}</p>
                    </MotionSectionOpacity>
                </>
            ) : null}
            {type === "SelectVerification" ? (
                <div data-header-select>
                    <Image
                        src="/svg/verification.svg"
                        alt="ver"
                        height={160}
                        width={160}
                    />
                    <MotionSectionOpacity>
                        <h3>Для авторизации я хочу использовать свой</h3>
                    </MotionSectionOpacity>
                </div>
            ) : null}
        </header>
    )
}
