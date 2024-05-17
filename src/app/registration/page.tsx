"use client"

import { useEffect } from "react"

import { usePush } from "@/helpers"
import { dispatchAuthModal } from "@/store"

export default () => {
  const { handlePush } = usePush()

  useEffect(() => {
    dispatchAuthModal({ visible: true, type: "SignUp" })
    handlePush("/")
  }, [])

  return null
}
