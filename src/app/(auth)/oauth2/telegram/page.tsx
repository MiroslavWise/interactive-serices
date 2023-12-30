"use client"

import { useEffect } from "react"

import { usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { dispatchAuthToken } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"

export default function CallbackTelegram() {
    const { on } = useToast()
    const { handlePush } = usePush()

    useEffect(() => {
        const hash = window.location.hash

        if (hash) {
            const queryForBody = hash.replace("#", "").split("=")
            const data = { [queryForBody[0]]: queryForBody[1] }

            serviceAuth.postTelegram(data).then((response) => {
                console.log("response: postTelegram", response)
                if (response.ok) {
                    if (response?.res) {
                        dispatchAuthToken({ email: "", ...response?.res })
                        handlePush("/")
                        on({
                            message: "Авторизация через червис Telegram прошла успешно",
                        })
                    }
                } else {
                    on({
                        message:
                            "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, Telegram проводит какие-то опецарации, попробуйте чуть позже",
                    })
                    handlePush("/")
                }
            })
        }
    }, [])

    return null
}
