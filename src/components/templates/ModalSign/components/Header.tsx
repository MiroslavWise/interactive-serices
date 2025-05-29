import { EnumSign } from "@/types/enum"

import { useModalAuth } from "@/store"

const OBJ = {
  [EnumSign.SignIn]: "Вход",
  [EnumSign.SignUp]: "Регистрация",
  [EnumSign.ForgotPassword]: "Восстановление пароля",
  [EnumSign.ResetPassword]: "Пароль",
  [EnumSign.CreatePassword]: "Пароль",
  [EnumSign.ExistingAccount]: "Аккаунт уже существует",
  [EnumSign.InformationEmailReset]: "Восстановление пароля",
  [EnumSign.InformationCreateAccount]: "Подтверждение почты",
  [EnumSign.CurrentUser]: "Аккаунт уже существует",
  [EnumSign.NumberConfirmation]: "Подтверждение номера",
  [EnumSign.CodeVerification]: "Подтверждение номера",
}

/** Заголовок модального окна авторизации */
function HeaderAuth() {
  const type = useModalAuth(({ type }) => type)

  const title = type && OBJ.hasOwnProperty(type!) ? OBJ[type!] : null

  return (
    <header className="w-full h-[4.75rem] bg-BG-second rounded-t-2 rounded-b-none border-b border-solid border-grey-separator pt-6 py-0 pb-5 flex flex-row items-center justify-center sticky max-md:top-0 max-md:z-[100] max-md:!rounded-none">
      <h3 className="text-text-primary text-center text-2xl font-semibold">{title}</h3>
    </header>
  )
}

HeaderAuth.displayName = "HeaderAuth"
export default HeaderAuth
