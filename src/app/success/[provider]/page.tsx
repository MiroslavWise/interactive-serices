"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { EnumTypeProvider } from "@/types/enum"

export default ({ params }: { params: { provider: EnumTypeProvider } }) => {
  const { provider } = params ?? {}
  const id = useSearchParams().get("id") as string | number

  useEffect(() => {
    setTimeout(() => {
      window.close()
    }, 2777)
  }, [id])

  return <div className="fixed z-[1000] w-full h-full bg-BG-second inset-0"></div>
}
