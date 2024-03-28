"use client"

import { useReducer } from "react"

import type { IActionOffers, IStateOffers } from "@/components/profile/OffersPage/types/types"

import { ContainerHeader, ContainerOffersNow } from "@/components/profile"
import { OffersMobile } from "@/components/screens"

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
