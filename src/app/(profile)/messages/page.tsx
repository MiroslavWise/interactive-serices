"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { ListChat, Chat, InterviewerInfo } from "@/components/messages"

import { useResize } from "@/helpers"
import { dispatchDataUser } from "@/store"

export default function Messages() {
  const idThread = useSearchParams().get("thread")
  const idBarter = useSearchParams().get("barter-id")
  const idUser = useSearchParams().get("user")
  const idOfferPay = useSearchParams().get("offer-pay")
  const { isTablet } = useResize()

  useEffect(() => {
    return () => {
      dispatchDataUser(undefined)
    }
  }, [])

  return isTablet ? (
    [!!idUser, !!idThread, !!idBarter, !!idOfferPay].some((item) => !!item) ? (
      <Chat />
    ) : (
      <ListChat />
    )
  ) : (
    <>
      <ListChat />
      <Chat />
      <InterviewerInfo />
    </>
  )
}
