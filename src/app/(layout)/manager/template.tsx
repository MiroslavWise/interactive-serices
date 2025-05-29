"use client"

import { type PropsWithChildren } from "react"

import { ETitleRole } from "@/services/roles/types"

import { useAuth } from "@/store"

export default ({ children }: PropsWithChildren) => {
  const user = useAuth(({ user }) => user)

  const { roles = [] } = user ?? {}

  const is = true
  // roles.some((_) => [ETitleRole.Manager, ETitleRole.SuperAdmin, ETitleRole.Admin].includes(_.title))

  return is ? children : null
}
