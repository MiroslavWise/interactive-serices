"use client"

import * as VKID from "@vkid/sdk"
import { useEffect, useRef, useState } from "react"

import { cx } from "@/lib/cx"
import { clg } from "@console"

import styles from "./spinner.module.scss"

export default () => {
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  function vkidOnError(event: any) {
    clg("vkidOnError: ", event, "error")
  }
  async function vkidOnSuccess(event: any) {
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

      clg("hashString: ", hashString)
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

      const oneTap = new VKID.OneTap()

      oneTap
        .render({
          container: ref.current,
          showAlternativeLogin: true,
          oauthList: [VKID.OAuthName.MAIL, VKID.OAuthName.OK],
        })
        .on(VKID.WidgetEvents.ERROR, vkidOnError)
        .on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, function (payload: any) {
          setLoading(true)
          clg("LOGIN_SUCCESS payload: ", payload)
          const code = payload.code
          const deviceId = payload.device_id

          VKID.Auth.exchangeCode(code, deviceId)
            .then(vkidOnSuccess)
            .catch(vkidOnError)
            .finally(() => setLoading(false))
        })
    }
  }, [])

  return (
    <main className="w-full h-dvh flex items-center justify-center">
      {loading && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-translucent">
          <img className={cx("w-20 h-20 rotate-0", styles.img)} src="/svg/spinner.svg" alt="loading" width={50} height={50} />
        </div>
      )}
      <div className="max-w-80" ref={ref} />
    </main>
  )
}
