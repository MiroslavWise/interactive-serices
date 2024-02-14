import { create } from "zustand"

import type { IStateDeleteOffer } from "../types/typeDeleteOffer"

export const useDeleteOffer = create<IStateDeleteOffer>(() => ({
  visible: false,
  idOffer: null,
}))

export const dispatchDeleteOffer = ({ visible, idOffer }: IStateDeleteOffer) => useDeleteOffer.setState(() => ({ visible, idOffer }))
