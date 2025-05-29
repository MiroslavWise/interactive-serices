"use client"

import { useRouter } from "next/navigation"
import { useEffect, type PropsWithChildren } from "react"

import { EStatusAuth } from "@/store"
import { useStatusAuth } from "@/helpers/use-status-auth"

function ContextProfile({ children }: PropsWithChildren) {
  const statusAuth = useStatusAuth()

  const { push } = useRouter()

  useEffect(() => {
    if (statusAuth === EStatusAuth.UNAUTHORIZED) {
      push("/")
    }
  }, [statusAuth])

  return statusAuth === EStatusAuth.AUTHORIZED ? children : null
}

ContextProfile.displayName = "ContextProfile"
export default ContextProfile
