import { create } from "zustand"

import type { IActionAddTestimonials, IStateAddTestimonials } from "../types/createAddTestimonials"

export const useAddTestimonials = create<IStateAddTestimonials>((set, get) => ({
  visible: false,
}))

export const dispatchAddTestimonials = (values: IActionAddTestimonials) =>
  useAddTestimonials.setState((_) => ({
    ...values,
  }))
