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
  POST = "post",
}

export enum EStatusAuth {
  NOT_AUTHORIZATION = "Not Authorization",
}

/** Наименование действия и ссылка на это действие */
export interface EActionCompany {
  action: EAdvertsButton
  url: string
}

/** Дополнительная кнопка действия для рекламных публикаций */
export enum EAdvertsButton {
  /** Сайт
   * @public
   * */
  WEBSITE = "website",
  /** Подробнее
   * @public
   */
  READ_MORE = "read-more",
  /** Перейти в чат
   * @public
   */
  GO_TO_CHAT = "go-to-chat",
  /** Позвонить
   * @public
   */
  CALL = "call",
  /** Позвонить по WhatsApp
   * @public
   */
  CALL_ON_WHATSAPP = "call-on-whatsapp",
  /** Стать участником */
  BECOME_A_MEMBER = "become-a-member",
  /** Записаться
   * @public
   */
  ENROLLING = "enrolling",
  /** Зарегистрироваться
   * @public
   */
  SIGN_UP = "sign-up",
  /** Купить
   * @public
   */
  BUY = "buy",
  /** Заказать
   * @public
   */
  ORDER = "order",
  /** Канал в Telegram
   * @public
   */
  TELEGRAM_CHANNEL = "telegram-channel",
  /** Задать вопрос
   * @public
   */
  ASK_A_QUESTION = "ask-a-question",
  /** Перейти к обсуждению */
  GO_TO_DISCUSSION = "go-to-discussion",
}

export const advertsButtonLabels: Record<EAdvertsButton, string> = {
  [EAdvertsButton.WEBSITE]: "Перейти на сайт",
  [EAdvertsButton.READ_MORE]: "Подробнее",
  [EAdvertsButton.GO_TO_CHAT]: "Перейти в чат",
  [EAdvertsButton.CALL]: "Позвонить",
  [EAdvertsButton.CALL_ON_WHATSAPP]: "WhatsApp",
  [EAdvertsButton.BECOME_A_MEMBER]: "Стать участником",
  [EAdvertsButton.ENROLLING]: "Записаться",
  [EAdvertsButton.SIGN_UP]: "Зарегистрироваться",
  [EAdvertsButton.BUY]: "Купить",
  [EAdvertsButton.ORDER]: "Заказать",
  [EAdvertsButton.TELEGRAM_CHANNEL]: "Канал в Telegram",
  [EAdvertsButton.ASK_A_QUESTION]: "Задать вопрос",
  [EAdvertsButton.GO_TO_DISCUSSION]: "Перейти к обсуждению",
}

export const arrayAdvertsButtonLabels = Object.entries(advertsButtonLabels) as [EAdvertsButton, string][]

const ACTIVE = [
  EAdvertsButton.WEBSITE,
  EAdvertsButton.CALL,
  EAdvertsButton.CALL_ON_WHATSAPP,
  EAdvertsButton.SIGN_UP,
  EAdvertsButton.GO_TO_CHAT,
  EAdvertsButton.TELEGRAM_CHANNEL,
  EAdvertsButton.READ_MORE,
  EAdvertsButton.BUY,
  EAdvertsButton.ORDER,
  EAdvertsButton.ENROLLING,
  EAdvertsButton.ASK_A_QUESTION,
]

export const activeArrayAdvertsButtonLabels = arrayAdvertsButtonLabels.filter(([key, _]) => ACTIVE.includes(key))

export enum ETypeAuth {
  GOOGLE = "google",
  VK = "vk",
  TELEGRAM = "telegram",
  YANDEX = "yandex",
}
