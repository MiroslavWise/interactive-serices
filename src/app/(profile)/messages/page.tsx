"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { ListChat, Chat, InterviewerInfo } from "@/components/messages"

import { useResize } from "@/helpers"
import { dispatchDataUser } from "@/store"

export default function Messages() {
  const searchParamsGet = useSearchParams()?.get
  const [idThread, idBarter, idUser, idOfferPay] = [
    searchParamsGet("thread"),
    searchParamsGet("barter-id"),
    searchParamsGet("user"),
    searchParamsGet("offer-pay"),
  ]
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
