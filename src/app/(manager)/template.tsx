"use client"

import { useAuth } from "@/store"
import { useEffect } from "react"

export default ({ children }: { children: React.ReactNode }) => {
  const roles = useAuth(({ roles }) => roles)

  useEffect(() => {
    console.log("roles template: ", roles)
  }, [roles])

  return children
}
