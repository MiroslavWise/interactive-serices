"use client"

import { useEffect } from "react"

import { getUserId } from "@/services"
import { queryClient } from "@/context"
import { dispatchAuthToken } from "@/store"
import { URL_API, usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { useToast } from "@/helpers/hooks/useToast"

async function fetchVK(data: Record<string, any>) {
  console.log("response: fetchVK - data: ", data)
  try {
    const url = new URL(`${URL_API}/auth/vk`)

    const body = {
      accessToken: data?.access_token ?? "",
      userId: data?.user_id ?? "",
      expiresIn: data?.expires_in ?? null,
      state: data?.state ?? "",
    }

    const response = await fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify(body),
    })

    const res = response

    console.log("response: fetchVK", res)

    return {
      ok: true,
      response: res,
    }
  } catch (e) {
    console.log("error fetchVK: ", e)
    return {
      error: true,
      message: e,
    }
  }
}

export default function CallbackVK() {
  const { on } = useToast()
  const { handlePush } = usePush()

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

      if (Object.entries(data).length > 0) {
        fetchVK(data).then((response) => {
          if (response.ok) {
            if (response?.response) {
              console.log("response: postVK", response)
              // serviceAuth.postVK(response?.response).then((response) => {
              //   console.log("response: postVK", response)
              //   if (response.ok) {
              //     if (response?.res) {
              //       queryClient
              //         .fetchQuery({
              //           queryFn: () => getUserId(response.res?.id!),
              //           queryKey: ["user", { userId: response.res?.id }],
              //         })
              //         .then(({ data }) => {
              //           if (!!data) {
              //             // if (!data?.profile?.username) {
              //             //   dispatchOnboarding("open")
              //             // }
              //             dispatchAuthToken({ auth: response.res!, user: data! })
              //             handlePush("/")
              //             on({
              //               message: "Авторизация через сервис ВКонтакте прошла успешно",
              //             })
              //           } else {
              //             on({
              //               message:
              //                 "К сожалению, сейчас мы не можем авторизовать вас через ВКонтакте. Пожалуйста, попробуйте другой способ.",
              //             })
              //             handlePush("/")
              //           }
              //         })
              //     }
              //   } else {
              //     on({
              //       message:
              //         "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, ВКонтакте проводит какие-то операции, попробуйте чуть позже",
              //     })
              //     handlePush("/")
              //   }
              // })
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
    } else {
      on({
        message: "Какие-то не верные данные. Не возможно авторизовать вас",
      })
      handlePush("/")
    }
  }, [])

  return null
}
