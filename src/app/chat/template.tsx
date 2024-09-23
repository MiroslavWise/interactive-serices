"use client"

import { useRouter } from "next/navigation"
import { type PropsWithChildren, useEffect } from "react"

import { useAuth } from "@/store"

export default ({ children }: PropsWithChildren) => {
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
