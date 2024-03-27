"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { RegistrationService } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthToken, dispatchOnboarding } from "@/store"

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
            dispatchAuthToken({
              ...response.res,
              email: "",
            })
          }
          requestAnimationFrame(() => {
            dispatchOnboarding("open")
            handlePush("/")
          })
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
