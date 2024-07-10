"use client"

import { type ReactNode } from "react"
import { useSearchParams } from "next/navigation"

import CreateBarter from "./CreateBarter"

function CreateNewChat({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()

  const barterId = searchParams.get("barter-id")

  if (!!barterId && typeof barterId === "string") return <CreateBarter idBarter={barterId} />

  return <>{children}</>
}

CreateNewChat.displayName = "CreateNewChat"
export default CreateNewChat
