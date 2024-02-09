import { type IAuth } from "./types/types"

import { wrapperPost } from "../requestsWrapper"

const route = "/auth"

export const serviceAuth: IAuth = {
  sms: (body) => wrapperPost({ url: `${route}/sms`, body }),
  phone: ({ phone }) => wrapperPost({ url: `${route}/phone`, body: { phone: phone, agree: true } }),
  postGoogle: (body) => wrapperPost({ url: `${route}/google`, body }),
  postTelegram: (body) => wrapperPost({ url: `${route}/telegram`, body }),
  postYandex: (body) => wrapperPost({ url: `${route}/yandex`, body }),
  postVK: (body) => wrapperPost({ url: `${route}/vk`, body }),
}

export const serviceAuthErrors = new Map([
  ["Unauthorized", "Пользователь не авторизован"],
  ["user is not verified", "Аккаунт не верефицирован. Проверьте письмо на вашей почте"],
  ["verification code expired or not found", "Ваше время верификации истекло"],
  ["user not found", "Аккаунт не существует"],
  ["invalid access token", "Время токена истекло"],
  ["password is not match", "Не верный пароль"],
  ["default", "Какая-то ошибка у нас на сервере. Мы сейчас разбираемся"],
])
