"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import { dispatchAuthModalResetPassword, dispatchClearAuth } from "@/store/hooks"

export default function PageResetPassword() {
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
