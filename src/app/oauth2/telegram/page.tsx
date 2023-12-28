"use client"

import { useEffect } from "react"

import { usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { dispatchAuthToken } from "@/store/hooks"

export default function CallbackTelegram() {
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
                        //добавить уведомление об успешной авторизации через Telegram
                        dispatchAuthToken({ email: "", ...response?.res })
                        handlePush("/profile")
                    }
                } else {
                    //добавить уведомление о некоректных данных
                    handlePush("/")
                }
            })
        }
    }, [])

    return null
}
