"use client"

import { useRouter } from "next/navigation"
import { useEffect, type PropsWithChildren } from "react"

import { useAuth } from "@/store"

function AuthChatContext({ children }: PropsWithChildren) {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const { push } = useRouter()

  useEffect(() => {
    if (typeof isAuth !== "undefined" && !isAuth) {
      push("/")
    }
  }, [isAuth])

  if (typeof isAuth === "undefined") return null
  if (!isAuth) return null

  return children
}

AuthChatContext.displayName = "AuthChatContext"
export default AuthChatContext
