"use client"

import { usePathname } from "next/navigation"

import { usePush } from "@/helpers"
import { useCallback } from "react"

export const useReplacePathName = () => {
  const pathname = usePathname()
  const { handlePush } = usePush()
  const onReplace = useCallback(() => {
    const replacePath = pathname.replaceAll("/", "")
    console.log("replacePath: ", replacePath)
    if (["legalads-agreement", "legalprivacy-policy", "legalterms"].includes(replacePath)) {
      handlePush("/")
    }
  }, [pathname])

  return { onReplace }
}
