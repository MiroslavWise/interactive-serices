import { create } from "zustand"

import { IStateUpdateMutualOffer } from "../types/createUpdateMutualOffer"
import { IResponseOffers } from "@/services/offers/types"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useUpdateMutualOffer = create<IStateUpdateMutualOffer>((set, get) => ({}))

export const dispatchUpdateMutual = ({ data, visible }: { data: IResponseOffers | undefined; visible: boolean }) => {
  if (visible) {
    dispatchModal(EModalData.UpdateProfile)
  } else {
    dispatchModalClose()
  }
  useUpdateMutualOffer.setState((_) => ({
    ..._,
    data: data,
  }))
}
