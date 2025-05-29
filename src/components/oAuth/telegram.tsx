"use client"

import { useEffect } from "react"

import { queryClient } from "@/context"
import { dispatchAuthToken } from "@/store"
import { URL_API, usePush } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { getUserId, serviceAuth } from "@/services"

export default () => {
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
              .then(({ data }) => {
                if (!!data) {
                  // if (!data?.profile?.username) {
                  //   dispatchOnboarding("open")
                  // }
                  dispatchAuthToken({ user: data!, auth: response?.res! })
                  handlePush("/")
                  on({
                    message: "Авторизация через сервис Telegram прошла успешно",
                  })
                } else {
                  on({
                    message: "К сожалению, сейчас мы не можем авторизовать вас через Telegram. Пожалуйста, попробуйте другой способ.",
                  })
                  handlePush("/")
                }
              })
          }
        } else {
          if (!!response?.error) {
            if (response?.error?.code === 401) {
              if (!!queryForBody[0]) {
                document.location.href = `${URL_API}/telegram/login`
                return
              }
            }
          }
          on({
            message:
              "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, Telegram проводит какие-то операции, попробуйте чуть позже",
          })
          handlePush("/")
        }
      })
    }
  }, [])

  return null
}
