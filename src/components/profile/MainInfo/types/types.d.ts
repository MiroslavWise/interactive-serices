import type { FC } from "react"
import type { IUserResponse } from "@/services/users/types"

export type TMainInfo = FC<{
    user: IUserResponse
}>
