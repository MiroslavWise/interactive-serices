"use client"

import { type PropsWithChildren } from "react"

import LoadingChat from "./LoadingChat"

import { useAuth } from "@/store"

function AuthChatContext({ children }: PropsWithChildren) {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  if (typeof isAuth === "undefined") return <LoadingChat />
  if (!isAuth) return null

  return children
}

AuthChatContext.displayName = "AuthChatContext"
export default AuthChatContext
