"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { getUserId, RegistrationService } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthToken, dispatchOnboarding } from "@/store"
import { queryClient } from "@/context"

export const dynamicParams = true

export default function PageVerify() {
  const verifyToken = useSearchParams()?.get("token")
  const { on } = useToast()
  const { handlePush } = usePush()

  useEffect(() => {
    if (verifyToken) {
      RegistrationService.verification({ code: verifyToken! }).then((response) => {
        if (response.ok) {
          on({
            message: "Ваш аккаунт успешно прошёл верификацию",
          })
          if (response.res) {
            queryClient
              .fetchQuery({
                queryFn: () => getUserId(response.res?.id!),
                queryKey: ["user", { userId: response.res?.id }],
              })
              .then(({ ok, res }) => {
                if (ok) {
                  dispatchAuthToken({ user: res!, auth: response?.res! })

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
    }
  }, [verifyToken])

  return null
}
