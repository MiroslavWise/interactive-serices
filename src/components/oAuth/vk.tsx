"use client"

import { useEffect } from "react"

import * as VKID from "@vkid/sdk"

import { getUserId } from "@/services"
import { queryClient } from "@/context"
import { dispatchAuthToken } from "@/store"
import { URL_API, usePush } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { useToast } from "@/helpers/hooks/useToast"
import { clg } from "@console"

/** @private */
const CLIENT_ID = 51817076

async function _vk(data: Record<string, any>) {
  console.log("data _vk: ", data)
  try {
    const endpoint = new URL(`https://api.vk.com/method/account.getProfileInfo`)

    endpoint.searchParams.set("access_token", data?.access_token ?? "")
    endpoint.searchParams.set("v", "5.199")

    // VKID.Config.init({
    //   app: 51817076,
    //   redirectUrl: "https://dev.sheira.ru/oauth2/vk",
    //   source: VKID.ConfigSource.LOWCODE,
    //   scope: "email phone",
    // })

    // VKID.ConfigSource
    // VKID.Auth.userInfo(data?.access_token ?? "").then((res) => {
    //   clg("VKID.Auth.userInfo: ", res)
    // })

    const response = await fetch(endpoint)

    console.log("response: _vk", response)
  } catch (e) {
    console.log("error _vk: ", e)
    return {
      error: true,
      message: e,
    }
  }
}

async function fetchVK(data: Record<string, any>) {
  console.log("response: fetchVK - data: ", data)
  try {
    const endpoint = new URL(`${URL_API}/auth/vk`)

    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }

    const body = {
      accessToken: data?.access_token ?? "",
      userId: data?.user_id ?? "",
      expiresIn: data?.expires_in ?? null,
      state: data?.state ?? "",
    }

    if (Object.entries(body).length > 0) {
      requestInit.body = JSON.stringify(body)
    }

    const response = await fetch(endpoint, requestInit)

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

export default () => {
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

      function vkidOnError(event: any) {
        clg("vkidOnError: ", event, "error")
      }
      function vkidOnSuccess(event: any) {
        clg("vkidOnSuccess: ", event)

        VKID.Auth.userInfo(event?.access_token ?? "").then((res) => {
          clg("VKID.Auth.userInfo: ", res)

          const dataToHash = {
            email: res?.user?.email ?? "",
            firstName: res?.user?.first_name ?? "",
            lastName: res?.user?.last_name ?? "",
            userId: res?.user?.user_id,
          }

          const jsonString = JSON.stringify(dataToHash)
          const hashString = btoa(jsonString)
        })
      }

      const oAuth = new VKID.OAuthList()
      oAuth.on(VKID.WidgetEvents.ERROR, vkidOnError).on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, function (payload: any) {
        clg("LOGIN_SUCCESS payload: ", payload)
        const code = payload.code
        const deviceId = payload.device_id

        VKID.Auth.exchangeCode(code, deviceId).then(vkidOnSuccess).catch(vkidOnError)
      })

      if (Object.entries(data).length > 0) {
        // _vk(data)
        // fetchVK(data).then((response) => {
        //   if (response.ok) {
        //     if (response?.response) {
        //       console.log("response: postVK", response)
        //       // serviceAuth.postVK(response?.response).then((response) => {
        //       //   console.log("response: postVK", response)
        //       //   if (response.ok) {
        //       //     if (response?.res) {
        //       //       queryClient
        //       //         .fetchQuery({
        //       //           queryFn: () => getUserId(response.res?.id!),
        //       //           queryKey: ["user", { userId: response.res?.id }],
        //       //         })
        //       //         .then(({ data }) => {
        //       //           if (!!data) {
        //       //             // if (!data?.profile?.username) {
        //       //             //   dispatchOnboarding("open")
        //       //             // }
        //       //             dispatchAuthToken({ auth: response.res!, user: data! })
        //       //             handlePush("/")
        //       //             on({
        //       //               message: "Авторизация через сервис ВКонтакте прошла успешно",
        //       //             })
        //       //           } else {
        //       //             on({
        //       //               message:
        //       //                 "К сожалению, сейчас мы не можем авторизовать вас через ВКонтакте. Пожалуйста, попробуйте другой способ.",
        //       //             })
        //       //             handlePush("/")
        //       //           }
        //       //         })
        //       //     }
        //       //   } else {
        //       //     on({
        //       //       message:
        //       //         "У нас произошла какая-то ошибка, и мы не смогли вас авторизовать на сервисе. Возможно, ВКонтакте проводит какие-то операции, попробуйте чуть позже",
        //       //     })
        //       //     handlePush("/")
        //       //   }
        //       // })
        //     }
        //   } else {
        //     console.log("error vk: ", response?.message)
        //     on({
        //       message: "ошибка на стороне ВКонтакте. Мы её решаем сейчас",
        //     })
        //     handlePush("/")
        //   }
        // })
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
