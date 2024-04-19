import { create } from "zustand"

import type { IResponseOffers } from "@/services/offers/types"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useUpdateOffer = create<{ offer?: IResponseOffers }>(() => ({}))
export const dispatchUpdateOffer = (visible: boolean, offer?: IResponseOffers) => {
  if (visible) {
    dispatchModal(EModalData.UpdateOffer)
  } else {
    dispatchModalClose()
  }
  useUpdateOffer.setState(() => ({ offer }))
}
