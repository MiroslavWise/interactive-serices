import type { FC, DispatchWithoutAction, Dispatch, SetStateAction, ReactNode } from "react"

type TTypeButton = "primary" | "secondary" | "optional_blue" | "optional_pink"

interface IButtonProps {
  label: string
  classNames?: string
  handleClick?: DispatchWithoutAction
  disabled?: boolean
  type?: TTypeButton
  submit?: "submit" | "reset" | "button"
  shadow?: boolean
  small?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

interface IButtonFilter{
  label: string
  classNames?: string
  handleClick?: DispatchWithoutAction
  isAction?: boolean
  disabled?: boolean
  active: boolean
}

interface IButtonCircleGradient {
  classNames?: string
  handleClick?: DispatchWithoutAction
  disabled?: boolean
  type: "primary" | "option-1"
  icon: string
}

export type TButtonPropsFill = FC<IButtonProps>
export type TButtonPropsDefault = FC<IButtonProps>
export type TButtonsCircle = FC<IButtonsCircle>
export type TButtonFilter = FC<IButtonFilter>
export type TButtonCircleGradient = FC<IButtonCircleGradient>