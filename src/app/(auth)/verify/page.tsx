"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { queryClient } from "@/context"
import { useToast } from "@/helpers/hooks/useToast"
import { getUserId, RegistrationService } from "@/services"
import { dispatchAuthToken, dispatchClearAuth, dispatchOnboarding } from "@/store"

export default function PageVerify() {
  const verifyToken = useSearchParams()?.get("token")
  const { on } = useToast()
  const { handlePush } = usePush()

  useEffect(() => {
    if (verifyToken) {
      dispatchClearAuth().then(() => {
        RegistrationService.verification({ code: verifyToken! }).then((response) => {
          if (response.ok) {
            on({
              message: "Ваш аккаунт успешно прошёл верификацию",
            })
            if (response.res) {
              queryClient.fetchQuery({
                queryFn: () => getUserId(response.res?.id!),
                queryKey: ["user", { userId: response.res?.id }],
              }).then(({ data }) => {
                if (!!data) {
                  dispatchAuthToken({ user: data!, auth: response?.res! })

                  dispatchOnboarding("open")
                  handlePush("/")
                } else {
                  on({
                    message: "Ваш аккаунт не прошёл верификацию.",
                  })
                  handlePush("/")
                }
              })
            }
          } else {
            on({
              message: "Ваш аккаунт не прошёл верификацию.",
            })
            handlePush("/")
          }
        })
      })
    }
  }, [verifyToken])

  return null
}
