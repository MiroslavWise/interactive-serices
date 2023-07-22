import type { FC, Dispatch, SetStateAction, DispatchWithoutAction } from "react"

interface IBadgeAchievements {
  title: string
  total: string | number
  classNames?: string[]
}

export type TBadgeAchievements = FC<IBadgeAchievements>