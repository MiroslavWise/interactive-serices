import type { FC } from "react"
import type { IUserResponse } from "@/services/users/types/usersService"

interface IMobileMainInfo{
  user: IUserResponse
}

export type TMobileMainInfo = FC<IMobileMainInfo>