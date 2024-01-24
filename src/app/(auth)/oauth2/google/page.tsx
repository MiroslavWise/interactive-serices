"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { URL_API, usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { dispatchAuthToken, dispatchOnboarding } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"
import { queryClient } from "@/context"
import { serviceUser } from "@/services"

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
                    queryClient
                        .fetchQuery({
                            queryFn: () => serviceUser.getId(response.res?.id!),
                            queryKey: ["user", { userId: response.res?.id }],
                        })
                        .then((resUser) => {
                            if (resUser.ok) {
                                if (resUser.res) {
                                    if (!resUser?.res?.profile?.id) {
                                        dispatchOnboarding("open")
                                    }
                                }
                                dispatchAuthToken({ ...response?.res!, email: data.email })
                                handlePush("/")
                                on({
                                    message: "Авторизация через сервис Google прошла успешно",
                                })
                            } else {
                                on({
                                    message: "У нас произошла какая-то ошибка, и мы работаем над решением проблемы",
                                })
                                handlePush("/")
                            }
                        })
                }
            } else {
                if (!response.ok) {
                    if (!!response?.error) {
                        if (response?.error?.code === 401) {
                            const token = searchParams.get("access_token")
                            if (!!token) {
                                document.location.href = `${URL_API}/google/login`
                                return
                            }
                        }
                    }
                }
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
