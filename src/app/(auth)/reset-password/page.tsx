"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import { dispatchAuthModalResetPassword, dispatchClearAuth } from "@/store"
export default () => {
  const { push } = useRouter()
  const passwordResetToken = useSearchParams()?.get("token")

  useEffect(() => {
    if (passwordResetToken) {
      dispatchClearAuth().then(() => {
        dispatchAuthModalResetPassword(passwordResetToken!)
        push("/")
      })
    }
  }, [passwordResetToken])

  return null
}
