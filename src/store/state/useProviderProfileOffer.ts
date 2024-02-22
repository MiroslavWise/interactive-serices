import { create } from "zustand"

import { EnumTypeProvider } from "@/types/enum"

export const useProviderProfileOffer = create<TUseProviderProfileOffer>((set, get) => ({
  stateProvider: EnumTypeProvider.offer,
}))

interface IState {
  stateProvider: EnumTypeProvider
}

export const dispatchProvider = (value: EnumTypeProvider) =>
  useProviderProfileOffer.setState(() => ({
    stateProvider: value,
  }))

type TUseProviderProfileOffer = IState
