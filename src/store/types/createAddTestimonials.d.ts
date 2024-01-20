import type { IBarterResponse } from "@/services/barters/types"
import { IResponseTestimonials } from "@/services/testimonials/types"
import type { IUserResponse } from "@/services/users/types/usersService"

export interface IStateAddTestimonials {
    visible: boolean
    barter?: IBarterResponse
    user?: IUserResponse
    threadId?: number
    testimonials?: IResponseTestimonials[]
}

export interface IActionAddTestimonials extends IStateAddTestimonials {}
