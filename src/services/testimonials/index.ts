import type { IServiceTestimonials } from "./types"

import { wrapperPost, get, wrapperPatch, fetchGet } from "../request"

const url = "/testimonials"

export const getTestimonials: IServiceTestimonials["get"] = (query) => fetchGet({ url, query })
export const postTestimonial: IServiceTestimonials["post"] = (body) => wrapperPost({ url, body })
export const patchTestimonial: IServiceTestimonials["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const getTestimonialId: IServiceTestimonials["getId"] = (id) => fetchGet({ url: `${url}/${id}` })
