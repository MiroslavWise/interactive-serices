import { create } from "zustand"

import { EnumTypeProvider } from "@/types/enum"

export const useProviderProfileOffer = create<TUseProviderProfileOffer>(() => ({
  stateProvider: EnumTypeProvider.offer,
}))

export const dispatchProvider = (value: EnumTypeProvider) =>
  useProviderProfileOffer.setState(
    () => ({
      stateProvider: value,
    }),
    true,
  )

interface IState {
  stateProvider: EnumTypeProvider
}

type TUseProviderProfileOffer = IState
