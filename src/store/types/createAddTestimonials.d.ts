import type { IGetProfileIdResponse } from "@/services/profile/types"
import type { IResponseTestimonials } from "@/services/testimonials/types"
import { IUserResponse } from "@/services/users/types"

export interface IStateAddTestimonials {
  barterId?: number
  user?: IUserResponse
  testimonials?: IResponseTestimonials[]
  notificationId?: number
}

export interface IActionAddTestimonials extends IStateAddTestimonials {}
