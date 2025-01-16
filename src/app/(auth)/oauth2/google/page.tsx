"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { queryClient } from "@/context"
import { URL_API, usePush } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { getUserId, serviceAuth } from "@/services"
import { dispatchAuthToken, dispatchOnboarding } from "@/store"

const ARRAY_QUERY = ["access_token", "client_id", "email", "id", "name", "picture", "verified_email"]

export default () => {
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
              queryFn: () => getUserId(response.res?.id!),
              queryKey: ["user", { userId: response.res?.id }],
            })
            .then(({ data }) => {
              if (!!data) {
                // if (!data?.profile?.username) {
                //   dispatchOnboarding("open")
                // }
                dispatchAuthToken({ auth: response?.res!, user: data! })
                handlePush("/")
                on({
                  message: "Авторизация через сервис Google прошла успешно",
                })
              } else {
                on({
                  message: "К сожалению, сейчас мы не можем авторизовать вас через Google. Пожалуйста, попробуйте другой способ.",
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
            "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, Google проводит какие-то операции, попробуйте чуть позже",
        })
        handlePush("/")
      }
    })
  }, [searchParams])

  return null
}
