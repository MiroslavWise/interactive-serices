import type { FC } from "react"
import type { IUserResponse } from "@/services/users/types/usersService"

export type TMainInfo = FC<{
  user: IUserResponse
}>