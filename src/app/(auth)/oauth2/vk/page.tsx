"use client"

import { useEffect } from "react"

import { usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { dispatchAuthToken } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"

export default function CallbackVK() {
    const { on } = useToast()
    const { handlePush } = usePush()

    async function fetchVK({ access_token, user_id }: { access_token: string; user_id: string }) {
        try {
            const response = await fetch(`https://api.vk.com/method/account.getInfo?user_id=${user_id}&scope=offline&v=5.131`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })

            const { data } = (await response.json()) ?? {}

            console.log("response: fetchVK", data)

            return {
                ok: true,
                response: data,
            }
        } catch (e) {
            console.log("error fetchVK: ", e)
            return {
                error: true,
                message: e,
            }
        }
    }

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

            if (data?.access_token && data?.user_id) {
                fetchVK({ access_token: data?.access_token, user_id: data?.user_id }).then((response) => {
                    if (response.ok) {
                        if (response?.response) {
                            serviceAuth.postVK(response?.response).then((response) => {
                                console.log("response: postVK", response)
                                if (response.ok) {
                                    if (response?.res) {
                                        dispatchAuthToken({ email: "", ...response?.res })
                                        handlePush("/")
                                        on({
                                            message: "Авторизация через сервис ВКонтакте прошла успешно",
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
                        }
                    } else {
                        console.log("error vk: ", response?.message)
                        on({
                            message: "ошибка на стороне ВКонтакте. Мы её решаем сейчас",
                        })
                        handlePush("/")
                    }
                })
            }

            // serviceAuth.postVK(data).then((response) => {
            //     console.log("response: postVK", response)
            //     if (response.ok) {
            //         if (response?.res) {
            //             dispatchAuthToken({ email: "", ...response?.res })
            //             handlePush("/")
            //             on({
            //                 message: "Авторизация через сервис ВКонтакте прошла успешно",
            //             })
            //         }
            //     } else {
            //         on({
            //             message:
            //                 "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, ВКонтакте проводит какие-то опецарации, попробуйте чуть позже",
            //         })
            //         handlePush("/")
            //     }
            // })
        } else {
            on({
                message: "Какие-то не верные данные. Не возможно авторизовать вас",
            })
            handlePush("/")
        }
    }, [])

    return null
}
