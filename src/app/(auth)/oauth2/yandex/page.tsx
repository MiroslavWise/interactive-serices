"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { queryClient } from "@/context"
import { URL_API, usePush } from "@/helpers"
import { getUserId, serviceAuth } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthToken, dispatchOnboarding } from "@/store"

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
          queryClient
            .fetchQuery({
              queryFn: () => getUserId(response.res?.id!),
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
                  message: "Авторизация через сервис Yandex прошла успешно",
                })
              } else {
                on({
                  message: "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Мы работаем над исправлением",
                })
                //добавить уведомление о некоректных данных Yandex
                handlePush("/")
              }
            })
        }
      } else {
        if (!response.ok) {
          if (!!response?.error) {
            if (response?.error?.code === 401) {
              const token = searchParam.get("access_token")
              if (!!token) {
                document.location.href = `${URL_API}/yandex/login`
                return
              }
            }
          }
        }
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
