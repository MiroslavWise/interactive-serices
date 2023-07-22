import type { FC } from "react"
import type { IUserResponse } from "@/services/users/types/usersService"

interface IHeaderBlock{
  data: IUserResponse
}

interface IBadges{

}

export type THeaderBlock = FC<IHeaderBlock>
export type TBadges = FC<IBadges>