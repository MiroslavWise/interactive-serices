"use client"

import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

import { useAuth } from "@/store"

export default ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const isAuth = useAuth(({ isAuth }) => isAuth)

  useEffect(() => {
    if (typeof isAuth !== "undefined" && !isAuth) {
      router.prefetch("/")
      router.push("/")
    }
  }, [isAuth])

  return children
}
