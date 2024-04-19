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
          : ["ForgotPassword", "InformationEmailReset"].includes(type!)
          ? "Восстановление пароля"
          : ["CreatePassword", "ResetPassword"].includes(type!)
          ? "Пароль"
          : ["CodeVerification", "InformationCreateAccount"].includes(type!)
          ? `Подтверждение ${!!email ? "почты" : !!phone ? "номера" : ""}`
          : ["CurrentUser", "ExistingAccount"].includes(type!)
          ? "Аккаунт уже существует"
          : type === "NumberConfirmation"
          ? "Подтверждение номера"
          : null}
      </h3>
    </header>
  )
})
