"use client"

import { useEffect } from "react"

import { useAuth } from "@/store"
import { usePush } from "@/helpers"

export default ({ children }: { children: React.ReactNode }) => {
  const user = useAuth(({ user }) => user)
  const { handlePush } = usePush()

  useEffect(() => {
    console.log("roles template: ", user)
    // if (!roles) {
    //   handlePush("/")
    // }
  }, [user])

  return children
}
