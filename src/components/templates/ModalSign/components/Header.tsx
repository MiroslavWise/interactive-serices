import { memo } from "react"

import { useModalAuth } from "@/store/hooks"

export const HeaderAuth = memo(function HeaderAuth() {
    const type = useModalAuth(({ type }) => type)
    const email = useModalAuth(({ email }) => email)
    const phone = useModalAuth(({ phone }) => phone)

    return (
        <header>
            <h3>
                {type === "SignIn"
                    ? "Вход"
                    : type === "SignUp"
                    ? "Регистрация"
                    : type === "ForgotPassword"
                    ? "Восстановление пароля"
                    : type === "CreatePassword"
                    ? "Пароль"
                    : type === "CodeVerification"
                    ? `Подтверждение ${!!email ? "почты" : !!phone ? "номера" : ""}`
                    : type === "ExistingAccount"
                    ? "Аккаунт уже существует"
                    : null}
            </h3>
        </header>
    )
})
