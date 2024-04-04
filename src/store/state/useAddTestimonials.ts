import { create } from "zustand"

import type { IActionAddTestimonials, IStateAddTestimonials } from "../types/createAddTestimonials"

export const useAddTestimonials = create<IStateAddTestimonials>(() => ({}))

export const dispatchAddTestimonials = (values: IActionAddTestimonials) =>
  useAddTestimonials.setState((_) => ({
    ...values,
  }))
