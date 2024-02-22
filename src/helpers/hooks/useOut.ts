"use client"

import { useAuth } from "@/store"
import { getLogout } from "@/services"

export const useOut = () => {
  const signOut = useAuth(({ signOut }) => signOut)

  function out() {
    getLogout().then((response) => {
      console.log("response logout: ", response)
      signOut()
    })
  }

  return { out }
}
