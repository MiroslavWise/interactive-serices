import type { FC } from "react"

export interface IPeopleCardNotifications{
  avatar: string
  name: string
  date: string
  rate: number
  description: string
  path?: string
}

export type TPeopleCardNotifications = FC<IPeopleCardNotifications>