import type { FC } from "react"
import type { IResponseOffers } from "@/services/offers/types"
import { IGetProfileIdResponse } from "@/services/profile/types"
import type { IUserResponse } from "@/services/users/types"

interface IProps {
    offer: IResponseOffers
    profile?: IGetProfileIdResponse
    isBalloon?: boolean
}

export type TProps = FC<IProps>
