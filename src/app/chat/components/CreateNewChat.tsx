"use client"

import { type ReactNode } from "react"
import { useSearchParams } from "next/navigation"

import CreateUser from "./CreateUser"
import CreateBarter from "./CreateBarter"
import CreateOfferPay from "./CreateOfferPay"

function CreateNewChat({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()

  const idUser = searchParams.get("user")
  const barterId = searchParams.get("barter-id")
  const offerPay = searchParams.get("offer-pay")

  if (!!idUser && typeof idUser === "string") return <CreateUser idUser={idUser} />
  if (!!barterId && typeof barterId === "string") return <CreateBarter idBarter={barterId} />
  if (!!offerPay && typeof offerPay === "string") return <CreateOfferPay offerPay={offerPay} />

  return <>{children}</>
}

CreateNewChat.displayName = "CreateNewChat"
export default CreateNewChat
