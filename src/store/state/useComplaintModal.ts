import { create } from "zustand"

import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"
import { IResponseOffers, IUserOffer } from "@/services/offers/types"

export const useComplaintModal = create<IStateComplaintModal>(() => ({}))

export const dispatchComplaintModalUser = ({ user }: { user?: IUserOffer }) => {
  if (!!user) {
    useComplaintModal.setState(
      (_) => ({
        user: user,
        offer: undefined,
      }),
      true,
    )
    dispatchModal(EModalData.ComplaintModal)
  } else {
    dispatchModalClose()
  }
}

export const dispatchComplaintModalOffer = ({ offer }: { offer?: IResponseOffers }) => {
  if (!!offer) {
    useComplaintModal.setState(
      (_) => ({
        offer: offer,
        user: undefined,
      }),
      true,
    )
    dispatchModal(EModalData.ComplaintModal)
  } else {
    dispatchModalClose()
  }
}

export const dispatchCleanComplaintModal = () =>
  useComplaintModal.setState(
    () => ({
      offer: undefined,
      user: undefined,
    }),
    true,
  )

interface IAction {
  user?: IUserOffer
  offer?: IResponseOffers
}

interface IStateComplaintModal {
  user?: IUserOffer
  offer?: IResponseOffers
}
