import type { FC } from "react"
import type { ISmallDataOfferBarter } from "@/services/barters/types"
import type { IGetProfileIdResponse } from "@/services/profile/types/profileService"
import type { IUserResponse } from "@/services/users/types/usersService"

interface IBlockBarter {
    consigner: ISmallDataOfferBarter
    initiator: ISmallDataOfferBarter
}

interface IBlockTitle extends IUserResponse {}

export type TBlockBarter = FC<IBlockBarter>
export type TBlockTitle = FC<IBlockTitle>
