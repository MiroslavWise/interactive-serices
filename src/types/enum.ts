export enum EnumTypeProvider {
  profile = "profile",
  offer = "offer",
  discussion = "discussion",
  alert = "alert",
  barter = "barter",
  threads = "threads",
  POST = "post",
  POST_COMMENT = "post-commentaries",
  NOTE = "note",
  TESTIMONIAL = "testimonial",
}

export enum EnumHelper {
  HELP_KURSK = "help-kursk",
}

export enum EnumSign {
  /** Вход */
  SignIn = "sign-in",
  /** Регистрация */
  SignUp = "sign-up",
  /** Восстановление пароля */
  ForgotPassword = "forgot-password",
  /** Сброс пароля */
  ResetPassword = "reset-password",
  /** Проверка кода */
  CodeVerification = "code-verification",
  /** Создание пароля */
  CreatePassword = "create-password",
  /** Уже есть аккаунт */
  ExistingAccount = "existing-account",
  /** Информация об электронной почте */
  InformationEmailReset = "information-email-reset",
  /** Информация о создании аккаунта */
  InformationCreateAccount = "information-create-account",
  /** Текущий пользователь */
  CurrentUser = "current-user",
  /** Номер подтверждения */
  NumberConfirmation = "number-confirmation",
}

export enum EnumStatusBarter {
  INITIATED = "initiated",
  EXECUTED = "executed",
  COMPLETED = "completed",
  DESTROYED = "destroyed",
  CANCELED = "canceled",
}

export enum EnumProviderThreads {
  PERSONAL = "personal",
  BARTER = "barter",
  GROUPS = "groups",
  OFFER_PAY = "offer-pay",
  HELP = "help",
}

export enum EStatusAuth {
  NOT_AUTHORIZATION = "Not Authorization",
}
