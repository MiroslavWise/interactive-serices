import { create } from "zustand"

import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"
import { IResponseOffers, IUserOffer } from "@/services/offers/types"
import { IPosts } from "@/services/posts/types"

export const useComplaintModal = create<IStateComplaintModal>(() => ({}))

export const dispatchComplaintModalUser = ({ user }: { user?: IUserOffer }) => {
  if (!!user) {
    useComplaintModal.setState(
      (_) => ({
        user: user,
        offer: undefined,
        post: undefined,
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
        post: undefined,
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
      post: undefined,
    }),
    true,
  )

export const dispatchComplaintModalPost = ({ post }: { post?: IPosts }) => {
  if (!!post) {
    useComplaintModal.setState(
      (_) => ({
        user: undefined,
        offer: undefined,
        post: post,
      }),
      true,
    )
    dispatchModal(EModalData.ComplaintModal)
  } else {
    dispatchModalClose()
    dispatchCleanComplaintModal()
  }
}

interface IStateComplaintModal {
  user?: IUserOffer
  offer?: IResponseOffers
  post?: IPosts
}
