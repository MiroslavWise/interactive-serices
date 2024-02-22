"use client"

import { useSearchParams } from "next/navigation"

import { ChatNull } from "./layout/ChatNull"
import { ChatEmpty } from "./layout/ChatEmpty"
import { ChatEmptyBarter } from "./layout/ChatEmptyBarter"
import { CurrentChat } from "./layout/CurrentChat"
import { ChatOfferPay } from "./layout/ChatOfferPay"

export const Chat = () => {
  const searchParams = useSearchParams()
  const idUser = searchParams.get("user")
  const idBarter = searchParams.get("barter-id")
  const isThread = searchParams.get("thread")
  const idOfferPay = searchParams.get("offer-pay")

  if (!!idBarter) return <ChatEmptyBarter />
  if (!!idUser) return <ChatEmpty />
  if (!!isThread) return <CurrentChat />
  if (!!idOfferPay) return <ChatOfferPay />

  return <ChatNull />
}
