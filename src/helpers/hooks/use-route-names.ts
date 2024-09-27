"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

const names = new Map([
  ["/chat/", "Сообщения"],
  ["/chat", "Сообщения"],
  ["/offers", "Обмены"],
  ["/offers/", "Обмены"],
  ["/profile/", "Профиль"],
  ["/profile", "Профиль"],
  ["/", null],
])

export const useRouteNames = () => {
  const pathname = usePathname()

  return useMemo(() => (names.has(pathname) ? names.get(pathname)! : names.get("/")!), [pathname])
}
