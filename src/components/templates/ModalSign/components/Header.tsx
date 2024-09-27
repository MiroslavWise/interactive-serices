import { EnumSign } from "@/types/enum"

import { useModalAuth } from "@/store"

function HeaderAuth() {
  const type = useModalAuth(({ type }) => type)

  return (
    <header className="w-full h-[4.75rem] bg-BG-second rounded-t-2 rounded-b-none border-b border-solid border-grey-separator pt-6 py-0 pb-5 flex flex-row items-center justify-center sticky max-md:top-0 max-md:z-[100] max-md:!rounded-none">
      <h3 className="text-text-primary text-center text-2xl font-semibold">
        {type === EnumSign.SignIn
          ? "Вход"
          : type === EnumSign.SignUp
          ? "Регистрация"
          : [EnumSign.ForgotPassword, EnumSign.InformationEmailReset].includes(type!)
          ? "Восстановление пароля"
          : [EnumSign.CreatePassword, EnumSign.ResetPassword].includes(type!)
          ? "Пароль"
          : type === EnumSign.CodeVerification
          ? "Подтверждение номера"
          : type === EnumSign.InformationCreateAccount
          ? "Подтверждение почты"
          : [EnumSign.CurrentUser, EnumSign.ExistingAccount].includes(type!)
          ? "Аккаунт уже существует"
          : type === EnumSign.NumberConfirmation
          ? "Подтверждение номера"
          : null}
      </h3>
    </header>
  )
}

HeaderAuth.displayName = "HeaderAuth"
export default HeaderAuth
