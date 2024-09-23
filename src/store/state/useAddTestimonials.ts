import { create } from "zustand"

import { type IUserResponse } from "@/services/users/types"
import { type IResponseTestimonials } from "@/services/testimonials/types"

export const useAddTestimonials = create<IStateAddTestimonials>(() => ({}))

export const dispatchAddTestimonials = (values: IActionAddTestimonials) =>
  useAddTestimonials.setState((_) => ({
    ...values,
  }))

export interface IStateAddTestimonials {
  barterId?: number
  user?: IUserResponse
  testimonials?: IResponseTestimonials[]
  notificationId?: number
}

export interface IActionAddTestimonials extends IStateAddTestimonials {}
