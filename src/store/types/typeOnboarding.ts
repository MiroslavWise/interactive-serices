import { EnumTypeProvider } from "@/types/enum"

export interface IStateUseOnboarding {
  valid: IValuesInterface
  type: EnumTypeProvider | null | "pre-close"
  step: number
  visible: boolean
  isPreClose: boolean
}

export interface IValuesInterface {
  isAddress?: boolean
  isCategoryId?: boolean
  isTitle?: boolean
  isFiles?: boolean
}

export type TActionOnboarding = "next" | "prev" | "open" | "continue" | "close" | "pre-close"
