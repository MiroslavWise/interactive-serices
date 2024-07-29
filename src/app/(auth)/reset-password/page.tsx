"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import { dispatchAuthModalResetPassword } from "@/store/hooks"

export default function PageResetPassword() {
  const { push } = useRouter()
  const passwordResetToken = useSearchParams()?.get("token")

  useEffect(() => {
    if (passwordResetToken) {
      dispatchAuthModalResetPassword(passwordResetToken!)
      push("/")
    }
  }, [passwordResetToken])

  return null
}
