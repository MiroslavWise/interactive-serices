import type { IResponseOffers } from "@/services/offers/types"
import type { IUserResponse } from "@/services/users/types/usersService"
import type { FC } from "react"

interface IProps {
    offer: IResponseOffers
    user?: IUserResponse
    isBalloon?: boolean
}

export type TProps = FC<IProps>
