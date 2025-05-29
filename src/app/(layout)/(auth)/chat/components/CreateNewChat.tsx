"use client"

import dynamic from "next/dynamic"
import { useQueryState } from "nuqs"
import { type PropsWithChildren } from "react"

import LoadingChat from "./LoadingChat"
const CreateUser = dynamic(() => import("./CreateUser"), {
  loading: LoadingChat,
})
const CreateHelp = dynamic(() => import("./CreateHelp"), {
  loading: LoadingChat,
})
const CreateBarter = dynamic(() => import("./CreateBarter"), {
  loading: LoadingChat,
})
const CreateOfferPay = dynamic(() => import("./CreateOfferPay"), {
  loading: LoadingChat,
})

import { QUERY_CHAT_BARTER_ID, QUERY_CHAT_HELP, QUERY_CHAT_ID_USER, QUERY_CHAT_OFFER_PAY } from "@/types/constants"

function CreateNewChat({ children }: PropsWithChildren) {
  const [idUser] = useQueryState(QUERY_CHAT_ID_USER)
  const [barterId] = useQueryState(QUERY_CHAT_BARTER_ID)
  const [offerPay] = useQueryState(QUERY_CHAT_OFFER_PAY)
  const [help] = useQueryState(QUERY_CHAT_HELP)

  if (!!idUser && typeof idUser === "string") return <CreateUser />
  if (!!barterId && typeof barterId === "string") return <CreateBarter />
  if (!!offerPay && typeof offerPay === "string") return <CreateOfferPay />
  if (!!help && typeof help === "string") return <CreateHelp />

  return children
}

CreateNewChat.displayName = "CreateNewChat"
export default CreateNewChat
