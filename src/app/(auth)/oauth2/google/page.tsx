"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { dispatchAuthToken } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"

const ARRAY_QUERY = ["access_token", "client_id", "email", "id", "name", "picture", "verified_email"]

export default function CallbackGoogle() {
    const { on } = useToast()
    const searchParams = useSearchParams()
    const { handlePush } = usePush()

    useEffect(() => {
        const data: Record<string, any> = {}
        ARRAY_QUERY.forEach((item) => {
            data[item] = searchParams.get(item)!
        })

        serviceAuth.postGoogle(data).then((response) => {
            console.log("response: postGoogle", response)
            if (response.ok) {
                if (response?.res) {
                    dispatchAuthToken({ ...response?.res, email: data.email })
                    handlePush("/")
                    on({
                        message: "Авторизация через сервис Google прошла успешно",
                    })
                }
            } else {
                on({
                    message:
                        "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, Google проводит какие-то опецарации, попробуйте чуть позже",
                })
                handlePush("/")
            }
        })
    }, [searchParams])

    return null
}
