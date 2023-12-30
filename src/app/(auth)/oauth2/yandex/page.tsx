"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { dispatchAuthToken } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"

const ARRAY_QUERY = ["access_token", "client_id", "email", "id", "login", "name", "picture", "psuid", "refresh_token"]

export default function CallbackYandex() {
    const { on } = useToast()
    const searchParam = useSearchParams()
    const { handlePush } = usePush()

    useEffect(() => {
        const data: Record<string, any> = {}
        ARRAY_QUERY.forEach((item) => {
            data[item] = searchParam.get(item)!
        })
        serviceAuth.postYandex(data).then((response) => {
            console.log("response: postYandex", response)
            if (response.ok) {
                if (response?.res) {
                    dispatchAuthToken({ ...response?.res, email: data.email })
                    handlePush("/profile")
                    on({
                        message: "Авторизация через червис Yandex прошла успешно",
                    })
                }
            } else {
                on({
                    message:
                        "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, Yandex проводит какие-то опецарации, попробуйте чуть позже",
                })
                //добавить уведомление о некоректных данных Yandex
                handlePush("/")
            }
        })
    }, [searchParam])

    return null
}
