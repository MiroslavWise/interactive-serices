"use client"

import { type ReactNode } from "react"
import { useSearchParams } from "next/navigation"

function CreateNewChat({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()

  return <>{children}</>
}

CreateNewChat.displayName = "CreateNewChat"
export default CreateNewChat
