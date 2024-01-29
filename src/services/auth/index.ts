import { type IAuth } from "./types/types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceAuth: IAuth = {
    route: "/auth",

    sms({ code, id }) {
        return wrapperFetch.methodPost(`${this.route}/sms`, { code, id })
    },
    phone({ phone }) {
        return wrapperFetch.methodPost(`${this.route}/phone`, { phone: phone, agree: true })
    },
    postGoogle(values) {
        return wrapperFetch.methodPost(`${this.route}/google`, values)
    },
    postTelegram(values) {
        return wrapperFetch.methodPost(`${this.route}/telegram`, values)
    },
    postYandex(values) {
        return wrapperFetch.methodPost(`${this.route}/yandex`, values)
    },
    postVK(values) {
        return wrapperFetch.methodPost(`${this.route}/vk`, values)
    },
}

export const serviceAuthErrors = new Map([
    ["unauthorized", "Пользователь не авторизован"],
    ["user is not verified", "Аккаунт не верефицирован. Проверьте письмо на вашей почте"],
    ["verification code expired or not found", "Ваше время верификации истекло"],
    ["user not found", "Аккаунт не существует"],
    ["invalid access token", "Время токена истекло"],
    ["password is not match", "Не верный пароль"],
    ["default", "Какая-то ошибка у нас на сервере. Мы сейчас разбираемся"],
])
