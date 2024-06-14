import { useModalAuth } from "@/store"

function HeaderAuth() {
  const type = useModalAuth(({ type }) => type)
  const email = useModalAuth(({ email }) => email)
  const phone = useModalAuth(({ phone }) => phone)
  return (
    <header className="w-full h-[4.75rem] bg-BG-second rounded-t-[2rem] rounded-b-none border-b-[1px] border-solid border-grey-separator pt-6 py-0 pb-5 flex flex-row items-center justify-center sticky max-md:top-0 max-md:z-[100] max-md:!rounded-none">
      <h3 className="text-text-primary text-center text-2xl font-semibold">
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
}

HeaderAuth.displayName = "HeaderAuth"
export default HeaderAuth
