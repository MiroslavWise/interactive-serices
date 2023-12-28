"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { dispatchAuthToken } from "@/store/hooks"

const ARRAY_QUERY = ["access_token", "client_id", "email", "id", "name", "picture", "verified_email"]

export default function CallbackGoogle() {
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
                    //добавить уведомление об успешной авторизации через Google
                    dispatchAuthToken({ ...response?.res, email: data.email })
                    handlePush("/profile")
                }
            } else {
                //добавить уведомление о некоректных данных
                handlePush("/")
            }
        })
    }, [searchParams])

    return null
}
