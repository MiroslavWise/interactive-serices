import type { IGetProfileIdResponse } from "@/services/profile/types"
import type { IResponseTestimonials } from "@/services/testimonials/types"

export interface IStateAddTestimonials {
    visible: boolean
    barterId?: number
    profile?: IGetProfileIdResponse
    threadId?: number
    testimonials?: IResponseTestimonials[]
    notificationId?: number
}

export interface IActionAddTestimonials extends IStateAddTestimonials {}
