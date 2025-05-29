import { TGetLogout, TPostNewPassword, type IAuth, IRequestPhone } from "./types/types"

import { fetchGet, wrapperPost } from "../request"

const route = "/auth"

export const serviceAuth: IAuth = {
  sms: (body) => wrapperPost({ url: `${route}/sms`, body }),
  phone: ({ phone, agree, marketing, params }) => {
    const data: IRequestPhone = {
      phone: phone,
    }

    if (typeof agree === "boolean") {
      data.agree = agree
    }
    if (typeof marketing === "boolean") {
      data.marketing = marketing
    }

    return wrapperPost({ url: `${route}/phone${params ? `/?${params}` : ""}`, body: data })
  },
  postGoogle: (body) => wrapperPost({ url: `${route}/google`, body }),
  postTelegram: (body) => wrapperPost({ url: `${route}/telegram`, body }),
  postYandex: (body) => wrapperPost({ url: `${route}/yandex`, body }),
  postVK: (body) => wrapperPost({ url: `${route}/vk`, body }),
}

export const postNewPassword: TPostNewPassword = (body) => wrapperPost({ url: `${route}/change-password`, body })
// export const getSession: TGetSession = () => get({ url: `${route}/session` })
export const getLogout: TGetLogout = () => fetchGet({ url: `${route}/logout` })

export const serviceAuthErrors: Map<string, string> = new Map([
  ["unauthorized", "Пользователь не авторизован"],
  ["user is not verified", "Аккаунт не прошел верификацию через e-mail. Проверьте почту"],
  ["verification code expired or not found", "Ваше время верификации истекло"],
  ["user not found", "Аккаунт не найден"],
  ["invalid access token", "Время токена истекло"],
  ["password is not match", "Неверный пароль"],
  ["password is incorrect", "Неверный пароль"],
  ["default", "Какая-то ошибка у нас на сервере. Мы сейчас разбираемся"],
  ["email is not valid", "Такой почты не существует"],
  ["password is not strong enough", "Пароль недостаточно сложный"],
  ["repeat is not strong enough", "Повтор недостаточно надёжный"],
  ["wrong sms code", "Неправильный смс-код"],
  ["throttlerexception: too many requests", "Слишком много запросов"],
  ["request entity too large", "Слишком большой, по объёму, запрос"],
  ["password too weak", "Пароль слишком слабый"],
  ["must agree", "Нет согласия с Пользовательским соглашением"],
  ["phone already exists", "Данный номер уже зарегистрирован"],
  ["email must be a valid domain", "Электронная почта должна быть с доменом .ru"],
])

export const functionAuthErrors = (messages: string | string[]): string => {
  if (!messages) {
    return ``
  }

  if (typeof messages === "string") {
    const messagesLowerCase = messages?.toLocaleLowerCase()
    return serviceAuthErrors.has(messagesLowerCase) ? serviceAuthErrors.get(messagesLowerCase)! : messagesLowerCase
  } else if (Array.isArray(messages)) {
    return messages
      ?.map((item) => (serviceAuthErrors.has(item.toLowerCase()) ? serviceAuthErrors.get(item.toLowerCase()) : item))
      .join(", ")
  } else {
    return ``
  }
}
