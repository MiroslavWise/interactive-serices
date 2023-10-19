import type {
    FC,
    DispatchWithoutAction,
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react"

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
    ref?: any
}

interface IButtonFilter {
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
    size?: number
}

interface IButtonRadio {
    active?: boolean
    label: string
    onClick?: DispatchWithoutAction
}

interface IButtonsCircle {
    src: string
    type: "primary" | "option-1" | "gray"
    onClick?: DispatchWithoutAction
}

export interface IPositionAbsolute {
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
}

interface IButtonClose {
    onClick: DispatchWithoutAction
    position: IPositionAbsolute
    className?: string
}

interface IButtonCircleGradientFill {
    submit?: "submit" | "reset" | "button"
    image: {
        src: string
        size?: number
        height?: number
        width?: number
    }
    type: "primary" | "option-1" | "gray"
    size: number
    disabled?: boolean
    onClick: DispatchWithoutAction
}

export type TButtonPropsFill = FC<IButtonProps>
export type TButtonPropsDefault = FC<IButtonProps>
export type TButtonsCircle = FC<IButtonsCircle>
export type TButtonFilter = FC<IButtonFilter>
export type TButtonCircleGradient = FC<IButtonCircleGradient>
export type TButtonRadio = FC<IButtonRadio>
export type TButtonClose = FC<IButtonClose>
export type TButtonCircleGradientFill = FC<IButtonCircleGradientFill>
