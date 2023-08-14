import type { FC } from "react"
import type { IGetProfileIdResponse } from "@/services/profile/types/profileService"

export type TMainInfo = FC<{
  profile: IGetProfileIdResponse
}>