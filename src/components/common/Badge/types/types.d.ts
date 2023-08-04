import type { FC, Dispatch, SetStateAction, DispatchWithoutAction } from "react"

interface IBadgeAchievements {
  title: string
  total: string | number
  classNames?: string[]
  type?: "up" | "down"
}

export type TBadgeAchievements = FC<IBadgeAchievements>