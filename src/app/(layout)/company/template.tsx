"use client"

import { type PropsWithChildren } from "react"

import { useAuth } from "@/store"

export default ({ children }: PropsWithChildren) => {
  const user = useAuth(({ user }) => user)

  const { company } = user ?? {}

  let is = !!company?.id

  return is ? children : null
}
