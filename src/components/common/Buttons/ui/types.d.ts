import type { FC, DispatchWithoutAction, Dispatch, SetStateAction } from "react"

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
}

interface IButtonFilter{
  label: string
  classNames?: string
  handleClick?: DispatchWithoutAction
  isAction?: boolean
  disabled?: boolean
  active: boolean
}

export type TButtonPropsFill = FC<IButtonProps>
export type TButtonPropsDefault = FC<IButtonProps>
export type TButtonsCircle = FC<IButtonsCircle>
export type TButtonFilter = FC<IButtonFilter>