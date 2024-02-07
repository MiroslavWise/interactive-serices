import { wrapperPost, wrapperGet, wrapperPatch, wrapperGetId } from "../requestsWrapper"
import type { IServiceTestimonials } from "./types"

const url = "/testimonials"

export const serviceTestimonials: IServiceTestimonials = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => wrapperGet({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
  getId: (id) => wrapperGetId({ url, id }),
}
