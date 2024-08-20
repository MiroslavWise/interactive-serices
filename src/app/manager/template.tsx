"use client"

import { useEffect } from "react"

import { useAuth } from "@/store"

export default ({ children }: { children: React.ReactNode }) => {
  const user = useAuth(({ user }) => user)

  useEffect(() => {
    console.log("roles template: ", user)
    // if (!roles) {
    //   handlePush("/")
    // }
  }, [user])

  return children
}
