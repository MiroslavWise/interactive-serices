import { create } from "zustand"

import { EModalData } from "./useModal"
import { IPosts } from "@/services/posts/types"
import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { dispatchModal } from "./useModal"

export const useAddTestimonials = create<IStateAddTestimonials>(() => ({
  provider: null,
}))

export const dispatchAddTestimonials = (values: IActionAddTestimonials) => {
  dispatchModal(EModalData.CompletionTransaction)
  useAddTestimonials.setState(
    (_) => ({
      provider: values?.provider ?? null,
      post: values?.post ?? undefined,
      offer: values?.offer ?? undefined,
    }),
    true,
  )
}

export const dispatchClearAddTestimonials = () =>
  useAddTestimonials.setState(
    (_) => ({
      provider: null,
      offer: undefined,
      post: undefined,
    }),
    true,
  )

export interface IStateAddTestimonials {
  provider: EnumTypeProvider | null
  offer?: IResponseOffers
  post?: IPosts
}

export interface IActionAddTestimonials extends IStateAddTestimonials {}
