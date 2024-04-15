"use client"

import dynamic from "next/dynamic"
import { useReducer } from "react"

import type { IActionOffers, IStateOffers } from "@/components/profile/OffersPage/types/types"

const OffersMobile = dynamic(() => import("@/components/screens/offers"), { ssr: false })
import { ContainerHeader, ContainerOffersNow } from "@/components/profile"

import { useResize } from "@/helpers"

const initialState: IStateOffers = {
  total: 0,
}

function reducer(_: IStateOffers, action: IActionOffers) {
  return {
    total: action?.total!,
  }
}

export default function OffersPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isTablet } = useResize()

  return isTablet ? (
    <OffersMobile />
  ) : (
    <>
      <ContainerHeader total={state.total || 0} />
      <ContainerOffersNow dispatch={dispatch} />
    </>
  )
}
