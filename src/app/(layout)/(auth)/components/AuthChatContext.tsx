"use client"

import { useRouter } from "next/navigation"
import { useEffect, type PropsWithChildren } from "react"

import { EStatusAuth } from "@/store"
import { useStatusAuth } from "@/helpers/use-status-auth"

function AuthChatContext({ children }: PropsWithChildren) {
  const statusAuth = useStatusAuth()
  const { push } = useRouter()

  useEffect(() => {
    if (statusAuth === EStatusAuth.UNAUTHORIZED) {
      push("/")
    }
  }, [statusAuth])

  if ([EStatusAuth.UNAUTHORIZED, EStatusAuth.CHECK].includes(statusAuth)) return null

  return children
}

AuthChatContext.displayName = "AuthChatContext"
export default AuthChatContext
