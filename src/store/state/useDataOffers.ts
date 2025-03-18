import { create } from "zustand"

import { IResponseOffers } from "@/services/offers/types"

import { clg } from "@console"

export const useDataOffers = create<IState>(() => ({}))

export const dispatchDataOffers = (offers: IResponseOffers[]) =>
  useDataOffers.setState((_) => {
    const newObj: Record<string | number, IResponseOffers> = {}

    for (const offer of offers) {
      newObj[offer.id] = offer
    }

    clg("dispatchDataOffers: ", "", "warning")

    return {
      ..._,
      ...newObj,
    }
  })

interface IState {
  [key: string | number]: IResponseOffers
}
