import { create } from "zustand"

import { type IResponseOffers } from "@/services/offers/types"

import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useUpdateDiscussionAndAlert = create<IStateUpdateDiscussionAndAlert>(() => ({}))

export const dispatchUpdateDiscussionAndAlert = ({ offer, visible }: { offer?: IResponseOffers; visible: boolean }) => {
  if (visible) {
    useUpdateDiscussionAndAlert.setState(
      () => ({
        offer,
      }),
      true,
    )
    dispatchModal(EModalData.UpdateDiscussionAndAlert)
  } else {
    useUpdateDiscussionAndAlert.setState(
      () => ({
        offer: undefined,
      }),
      true,
    )
    dispatchModalClose()
  }
}

interface IStateUpdateDiscussionAndAlert {
  offer?: IResponseOffers
}
