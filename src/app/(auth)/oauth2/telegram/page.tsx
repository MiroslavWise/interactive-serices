"use client"

import { useEffect } from "react"

import { queryClient } from "@/context"
import { URL_API, usePush } from "@/helpers"
import { getUserId, serviceAuth } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthToken, dispatchOnboarding } from "@/store"

export default function CallbackTelegram() {
  const { on } = useToast()
  const { handlePush } = usePush()

  useEffect(() => {
    const hash = window.location.hash

    if (hash) {
      const queryForBody = hash.replace("#", "").replace("=", ":").split(":")
      const data = { [queryForBody[0]]: queryForBody[1] }

      serviceAuth.postTelegram(data).then((response) => {
        console.log("response: postTelegram", response)
        if (response.ok) {
          if (response?.res) {
            queryClient
              .fetchQuery({
                queryFn: () => getUserId(response.res?.id!),
                queryKey: ["user", { userId: response.res?.id }],
              })
              .then((resUser) => {
                if (resUser?.ok) {
                  if (resUser.res) {
                    if (!resUser?.res?.profile?.id) {
                      dispatchOnboarding("open")
                    }
                  }
                  dispatchAuthToken({ email: "", ...response?.res! })
                  handlePush("/")
                  on({
                    message: "Авторизация через сервис Telegram прошла успешно",
                  })
                } else {
                  on({
                    message: "У нас произошла какая-то ошибка, и мы работаем над решением ошибки",
                  })
                  handlePush("/")
                }
              })
          }
        } else {
          //tgAuthResult
          if (!response.ok) {
            if (!!response?.error) {
              if (response?.error?.code === 401) {
                if (!!queryForBody[0]) {
                  document.location.href = `${URL_API}/telegram/login`
                  return
                }
              }
            }
          }
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
