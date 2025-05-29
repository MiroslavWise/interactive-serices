"use client"

import { ETitleRole } from "@/services/roles/types"

import { useAuth } from "@/store"

const useRole = (rolesUse: ETitleRole) => {
  const { roles = [] } = useAuth(({ user }) => user) ?? {}
  const is = roles?.some((_) => _.title === rolesUse || [ETitleRole.Admin, ETitleRole.SuperAdmin].includes(_.title))
  return is
}

export default useRole
