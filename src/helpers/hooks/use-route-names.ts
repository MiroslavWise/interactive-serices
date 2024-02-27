"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const names = new Map([
  ["/messages", "Сообщения"],
  ["/messages/", "Сообщения"],
  ["/offers", "Обмены"],
  ["/offers/", "Обмены"],
  ["/profile/", "Профиль"],
  ["/profile", "Профиль"],
  ["/", null],
])

export const useRouteNames = () => {
   const pathname = usePathname()
  const [state, setState] = useState<string | null>(null)

  // console.log("useRouteNames pathname", pathname)

  useEffect(() => {
     if (names.has(pathname)) {
      setState(names.get(pathname)!)
     } else {
      setState(names.get("/")!)
     }
   }, [pathname])

  return state
}
