"use client"

import dynamic from "next/dynamic"
import { useReducer } from "react"

import type { IActionOffers, IStateOffers } from "@/components/profile/OffersPage/types/types"

const OffersMobile = dynamic(() => import("@/components/screens/offers"), { ssr: false })
import { ContainerHeader, ContainerOffersNow } from "@/components/profile"

import { cx } from "@/lib/cx"
// import { useBanner } from "@/store"
import { useResize } from "@/helpers"

import main from "../layout.module.scss"

const initialState: IStateOffers = {
  total: 0,
}

function reducer(_: IStateOffers, action: IActionOffers) {
  return {
    total: action?.total!,
  }
}

export default function OffersPage() {
  // const visible = useBanner(({ visible }) => visible)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isTablet } = useResize()

  if (isTablet)
    return (
      <ul
        className={cx(
          main.wrapperInsideContainer,
          "flex flex-col overflow-y-auto w-full h-full gap-6 p-4",
          "__container-offer-page__",
          // visible ? main.banner : "",
        )}
        data-none-scroll
      >
        <OffersMobile />
      </ul>
    )

  return (
    <ul
      className={cx(
        main.wrapperInsideContainer,
        // visible ? main.banner :
        main.default,
        "flex flex-col overflow-y-auto gap-4",
        "__container-offer-page__",
        "!-mt-6",
      )}
      data-none-scroll
    >
      <ContainerHeader total={state.total || 0} />
      <ContainerOffersNow dispatch={dispatch} />
    </ul>
  )
}
