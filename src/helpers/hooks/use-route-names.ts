"use client"

import { useEffect, useState } from "react"
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
  const [state, setState] = useState<string | null>(null)

  useEffect(() => {
    if (names.has(pathname)) {
      setState(names.get(pathname)!)
    } else {
      setState(names.get("/")!)
    }
  }, [pathname])

  return state
}
