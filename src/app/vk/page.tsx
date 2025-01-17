"use client"

import { clg } from "@console"
import * as VKID from "@vkid/sdk"
import { useEffect, useRef } from "react"

export default () => {
  const ref = useRef<HTMLDivElement>(null)

  function vkidOnError(event: any) {
    clg("vkidOnError: ", event, "error")
  }
  function vkidOnSuccess(event: any) {
    clg("vkidOnSuccess: ", event)

    VKID.Auth.userInfo(event?.access_token ?? "").then((res) => {
      clg("VKID.Auth.userInfo: ", res)
    })
    VKID.Auth.publicInfo(event?.id_token ?? "").then((res) => {
      clg("VKID.Auth.publicInfo: ", res)
    })
  }

  useEffect(() => {
    if (ref.current) {
      VKID.Config.init({
        app: 51817076,
        redirectUrl: "https://dev.sheira.ru/oauth2/vk",
        responseMode: VKID.ConfigResponseMode.Callback,
        source: VKID.ConfigSource.LOWCODE,
        scope: "email phone",
      })

      const oAuth = new VKID.OAuthList()

      oAuth
        .render({
          container: ref.current,
          styles: {
            borderRadius: 20,
          },
          oauthList: [VKID.OAuthName.VK, VKID.OAuthName.MAIL, VKID.OAuthName.OK],
        })
        .on(VKID.WidgetEvents.ERROR, vkidOnError)
        .on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, function (payload: any) {
          clg("LOGIN_SUCCESS payload: ", payload)
          const code = payload.code
          const deviceId = payload.device_id

          VKID.Auth.exchangeCode(code, deviceId).then(vkidOnSuccess).catch(vkidOnError)
        })
    }
  }, [])

  return (
    <main className="w-full h-dvh flex items-center justify-center">
      <div className="max-w-80" ref={ref} />
    </main>
  )
}
