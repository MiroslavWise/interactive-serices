import { create } from "zustand"

import type { TTypeProvider } from "@/services/file-upload/types"

export const useProviderProfileOffer = create<TUseProviderProfileOffer>((set, get) => ({
    stateProvider: "offer",
}))

interface IState {
    stateProvider: TTypeProvider
}

export const dispatchProvider = (value: TTypeProvider) =>
    useProviderProfileOffer.setState(() => ({
        stateProvider: value,
    }))

type TUseProviderProfileOffer = IState
