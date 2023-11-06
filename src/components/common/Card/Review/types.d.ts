import type { FC } from "react"
import type { IResponseTestimonials } from "@/services/testimonials/types"

export interface ICardReview extends IResponseTestimonials {}

export type TCardReview = FC<ICardReview>
