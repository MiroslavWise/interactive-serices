"use client"

import { ReactNode } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer } from "@/store"

interface IProps {
  offer: IResponseOffers
  children: ReactNode
}

function WrapperItemService({ offer, children }: IProps) {
  function handle() {
    if (offer.provider === EnumTypeProvider.offer) {
      dispatchBallonOffer({ offer })
    }
    if (offer.provider === EnumTypeProvider.discussion) {
      dispatchBallonDiscussion({ offer })
    }
    if (offer.provider === EnumTypeProvider.alert) {
      dispatchBallonAlert({ offer })
    }
  }

  return (
    <li onClick={handle} className="relative w-full px-4 pt-3 pb-4 bg-BG-second rounded-2xl flex flex-col gap-4 cursor-pointer">
      {children}
    </li>
  )
}

WrapperItemService.displayName = "ItemService"
export default WrapperItemService
