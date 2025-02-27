"use client"

import { ETitleRole } from "@/services/roles/types"

import { useAuth } from "@/store"

type TMethod = "GET" | "POST" | "PATCH" | "DELETE"

type TRoutes =
  | "addresses"
  | "comments"
  | "companies"
  | "complains"
  | "messages"
  | "notes"
  | "offers"
  | "offers-categories"
  | "posts"
  | "posts-comments"
  | "roles"
  | "testimonials"
  | "threads"
  | "users"

type TCombineMethodRoute = `${TRoutes}:${TMethod}`

const mapRole: Map<TCombineMethodRoute, ETitleRole[]> = new Map([
  /** Роут пользователей */
  ["users:GET", [ETitleRole.Admin, ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Owner]],
  ["users:POST", [ETitleRole.SuperAdmin]],
  ["users:PATCH", [ETitleRole.SuperAdmin]],
  ["users:DELETE", [ETitleRole.SuperAdmin]],
  /** Роут offers */
  ["offers:GET", [ETitleRole.Admin, ETitleRole.SuperAdmin, ETitleRole.Manager]],
  ["offers:POST", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.User, ETitleRole.Owner]],
  ["offers:PATCH", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  ["offers:DELETE", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  /** Роут posts */
  ["posts:GET", [ETitleRole.Admin, ETitleRole.SuperAdmin, ETitleRole.Manager]],
  ["posts:POST", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.User, ETitleRole.Owner]],
  ["posts:PATCH", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  ["posts:DELETE", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  /** Роут companies */
  ["companies:GET", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  ["companies:POST", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  ["companies:PATCH", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  ["companies:DELETE", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  /** Роут notes */
  ["notes:GET", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  ["notes:POST", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  ["notes:PATCH", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
  ["notes:DELETE", [ETitleRole.SuperAdmin, ETitleRole.Manager, ETitleRole.Admin]],
])

export const useIsAllowAccess = (method: TMethod, route: TRoutes) => {
  if (typeof window === "undefined") return false

  const user = useAuth.getState().user

  if (!user) return false

  const combine = `${route}:${method}` as TCombineMethodRoute
  if (!mapRole.has(combine)) return false

  const { roles = [] } = user
  const titles = roles.map((_) => _.title)
  const allowRoles = mapRole.get(combine)
  for (const _ of titles) {
    if (allowRoles?.includes(_)) return true
  }

  return false
}
