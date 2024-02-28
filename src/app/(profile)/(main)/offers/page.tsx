"use client"

import { useReducer } from "react"
import { isMobile } from "react-device-detect"

import type { IActionOffers, IStateOffers } from "@/components/profile/OffersPage/types/types"

import { ContainerHeader, ContainerOffersNow, MobileSegments } from "@/components/profile"
import { OffersMobile } from "@/components/screens"

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

  return isMobile ? (
    <OffersMobile />
  ) : (
    <>
      <ContainerHeader total={state.total || 0} />
      <ContainerOffersNow dispatch={dispatch} />
    </>
  )
}
