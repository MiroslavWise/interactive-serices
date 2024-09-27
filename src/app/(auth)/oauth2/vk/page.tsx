"use client"

import { useEffect } from "react"

import { usePush } from "@/helpers"
import { getUserId } from "@/services"
import { fetchQuery } from "@/context"
import { serviceAuth } from "@/services/auth"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthToken, dispatchOnboarding } from "@/store"

async function fetchVK({ access_token, user_id }: { access_token: string; user_id: string }) {
  try {
    const response = await fetch(`https://api.vk.com/method/account.getInfo?user_id=${user_id}&scope=email,phone&v=5.131`, {
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

      if (data?.access_token && data?.user_id) {
        fetchVK({ access_token: data?.access_token, user_id: data?.user_id }).then((response) => {
          if (response.ok) {
            if (response?.response) {
              serviceAuth.postVK(response?.response).then((response) => {
                console.log("response: postVK", response)
                if (response.ok) {
                  if (response?.res) {
                    fetchQuery({
                      queryFn: () => getUserId(response.res?.id!),
                      queryKey: ["user", { userId: response.res?.id }],
                    }).then(({ data }) => {
                      if (!!data) {
                        if (!data?.profile?.username) {
                          dispatchOnboarding("open")
                        }
                        dispatchAuthToken({ auth: response.res!, user: data! })
                        handlePush("/")
                        on({
                          message: "Авторизация через сервис ВКонтакте прошла успешно",
                        })
                      } else {
                        on({
                          message:
                            "К сожалению, сейчас мы не можем авторизовать вас через ВКонтакте. Пожалуйста, попробуйте другой способ.",
                        })
                        handlePush("/")
                      }
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
    } else {
      on({
        message: "Какие-то не верные данные. Не возможно авторизовать вас",
      })
      handlePush("/")
    }
  }, [])

  return null
}
