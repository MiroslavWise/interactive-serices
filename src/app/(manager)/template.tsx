"use client"

import { useEffect } from "react"

import { useAuth_ } from "@/store"
import { usePush } from "@/helpers"

export default ({ children }: { children: React.ReactNode }) => {
  const user = useAuth_(({ user }) => user)
  const { handlePush } = usePush()

  useEffect(() => {
    console.log("roles template: ", user)
    // if (!roles) {
    //   handlePush("/")
    // }
  }, [user])

  return children
}
