import type { THeaderModal } from "../types/types"

import { useModalAuth } from "@/store/hooks"

export const HeaderAuth: THeaderModal = () => {
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
                    : null}
            </h3>
        </header>
    )
}
