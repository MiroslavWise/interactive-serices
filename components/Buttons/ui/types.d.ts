import type { FC, DispatchWithoutAction, Dispatch } from "react";

type TTypeButton = 'primary' | 'secondary' | 'optional_blue' | 'optional_pink'
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

interface IButtonsCircle{
        src: string
        type: 'primary'
}

export type TButtonPropsFill = FC<IButtonProps>
export type TButtonPropsDefault = FC<IButtonProps>
export type TButtonsCircle = FC<IButtonsCircle>