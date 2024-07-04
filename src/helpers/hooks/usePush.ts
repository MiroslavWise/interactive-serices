"use client"

import { useRouter, usePathname } from "next/navigation"

import { dispatchAnimated } from "@/store"

export const usePush = () => {
  const { push, replace, back } = useRouter()
  const pathname = usePathname()

  function handleReplace(value: string) {
    replace(value)
    dispatchAnimated(false)
  }

  function handlePush(value: string) {
    if (pathname !== value) {
      dispatchAnimated(true)
    }
    push(value, { scroll: false })
  }

  function backing() {
    back()
  }

  return { handlePush, handleReplace, backing }
}
