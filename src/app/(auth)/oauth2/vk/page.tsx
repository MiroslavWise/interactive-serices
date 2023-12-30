"use client"

import { useEffect } from "react"

import { usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { dispatchAuthToken } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"

export default function CallbackVK() {
    const { on } = useToast()
    const { handlePush } = usePush()

    useEffect(() => {
        const hash = window.location.hash

        if (hash) {
            const data: Record<string, any> = {}

            const queryForBody = hash
                .replace("#", "")
                .split("&")
                .map((item) => item.replace("=", ":").split(":"))

            queryForBody.forEach(([key, value]) => {
                data[key] = value
            })

            serviceAuth.postVK(data).then((response) => {
                console.log("response: postVK", response)
                if (response.ok) {
                    if (response?.res) {
                        dispatchAuthToken({ email: "", ...response?.res })
                        handlePush("/")
                        on({
                            message: "Авторизация через червис ВКонтакте прошла успешно",
                        })
                    }
                } else {
                    on({
                        message:
                            "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, ВКонтакте проводит какие-то опецарации, попробуйте чуть позже",
                    })
                    handlePush("/")
                }
            })
        } else {
            on({
                message: "Какие-то не верные данные. Не возможно авторизовать вас",
            })
            handlePush("/")
        }
    }, [])

    return null
}
