"use client"

import { useRouter } from "next/navigation"

export const usePush = () => {
  const { push, replace, back } = useRouter()

  const handleReplace = (value: string) => replace(value)
  const handlePush = (value: string) => push(value, { scroll: false })
  const backing = back

  return { handlePush, handleReplace, backing }
}
