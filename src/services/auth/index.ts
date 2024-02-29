import { TGetLogout, TGetSession, TPostNewPassword, type IAuth } from "./types/types"

import { wrapperGet, wrapperPost } from "../requestsWrapper"

const route = "/auth"

export const serviceAuth: IAuth = {
  sms: (body) => wrapperPost({ url: `${route}/sms`, body }),
  phone: ({ phone }) => wrapperPost({ url: `${route}/phone`, body: { phone: phone, agree: true } }),
  postGoogle: (body) => wrapperPost({ url: `${route}/google`, body }),
  postTelegram: (body) => wrapperPost({ url: `${route}/telegram`, body }),
  postYandex: (body) => wrapperPost({ url: `${route}/yandex`, body }),
  postVK: (body) => wrapperPost({ url: `${route}/vk`, body }),
}

export const postNewPassword: TPostNewPassword = (body) => wrapperPost({ url: `${route}/change-password`, body })
export const getSession: TGetSession = () => wrapperGet({ url: `${route}/session` })
export const getLogout: TGetLogout = () => wrapperGet({ url: `${route}/logout` })

export const serviceAuthErrors = new Map([
  ["unauthorized", "Пользователь не авторизован"],
  ["user is not verified", "Аккаунт не прошел верификацию через e-mail. Проверьте почту"],
  ["verification code expired or not found", "Ваше время верификации истекло"],
  ["user not found", "Аккаунт не найден"],
  ["invalid access token", "Время токена истекло"],
  ["password is not match", "Неверный пароль"],
  ["password is incorrect", "Неверный пароль"],
  ["default", "Какая-то ошибка у нас на сервере. Мы сейчас разбираемся"],
  ["email is not valid", "Не валидный email"],
])
