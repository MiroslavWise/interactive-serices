"use client"

import { useRouter } from "next/navigation"

export const usePush = () => {
  const { push, replace, back } = useRouter()

  function handleReplace(value: string) {
    replace(value)
  }

  function handlePush(value: string) {
    push(value, { scroll: false })
  }

  function backing() {
    back()
  }

  return { handlePush, handleReplace, backing }
}
