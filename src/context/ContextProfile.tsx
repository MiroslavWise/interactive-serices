"use client"

import { useRouter } from "next/navigation"
import { useEffect, type PropsWithChildren } from "react"

import { useAuth } from "@/store"

function ContextProfile({ children }: PropsWithChildren) {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  const { push } = useRouter()

  useEffect(() => {
    if (typeof isAuth !== "undefined" && !isAuth) {
      push("/")
    }
  }, [isAuth])

  return isAuth ? children : null
}

ContextProfile.displayName = "ContextProfile"
export default ContextProfile
