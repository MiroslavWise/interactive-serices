"use client"

import dynamic from "next/dynamic"
import { type ReactNode } from "react"
import { useSearchParams } from "next/navigation"

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

function CreateNewChat({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()

  const idUser = searchParams.get("user")
  const barterId = searchParams.get("barter-id")
  const offerPay = searchParams.get("offer-pay")
  const help = searchParams.get("help")

  if (!!idUser && typeof idUser === "string") return <CreateUser idUser={idUser} />
  if (!!barterId && typeof barterId === "string") return <CreateBarter idBarter={barterId} />
  if (!!offerPay && typeof offerPay === "string") return <CreateOfferPay offerPay={offerPay} />
  if (!!help && typeof help === "string") return <CreateHelp />

  return <>{children}</>
}

CreateNewChat.displayName = "CreateNewChat"
export default CreateNewChat
