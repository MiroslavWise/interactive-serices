"use client"

import { useEffect } from "react"

import { useAuth } from "@/store"
import { usePush } from "@/helpers"

export default ({ children }: { children: React.ReactNode }) => {
  const roles = useAuth(({ roles }) => roles)
  const { handlePush } = usePush()

  useEffect(() => {
    console.log("roles template: ", roles)
    // if (!roles) {
    //   handlePush("/")
    // }
  }, [roles])

  return children
}
