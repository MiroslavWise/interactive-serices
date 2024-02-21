"use client"

import { useEffect } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { ListChat, Chat, InterviewerInfo } from "@/components/messages"

import { dispatchDataUser } from "@/store"

export default function Messages() {
  const searchParamsGet = useSearchParams()?.get
  const [idThread, idBarter, idUser, idOfferPay] = [
    searchParamsGet("thread"),
    searchParamsGet("barter-id"),
    searchParamsGet("user"),
    searchParamsGet("offer-pay"),
  ]

  useEffect(() => {
    const widthMarginMessage = `${25 + 2.75}rem`
    const widthMarginProfile = `${17.5 + 3}rem`

    function setDataRoot(value: string) {
      document.documentElement.style.setProperty("--left-links-margin", value)
    }

    setDataRoot(widthMarginMessage)

    return () => {
      dispatchDataUser(undefined)
      setDataRoot(widthMarginProfile)
    }
  }, [])

  return isMobile ? (
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
