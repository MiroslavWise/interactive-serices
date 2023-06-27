'use client'

import { type TButtonPropsFill } from "./types";

export const ButtonFill: TButtonPropsFill = ({
        label,
        classNames,
        handleClick,
        disabled,
        type,
        submit,
        shadow,
        small,
}) => {

        const click = () => {
                if (handleClick) {
                        handleClick()
                }
        }

        return (
                <button
                        className={`button-fill ${type || 'primary'} ${disabled ? 'disabled' : ''} ${classNames ? classNames : ''} ${shadow ? 'shadow' : ''} ${small ? 'small' : ''}`}
                        onClick={click}
                        type={submit || "button"}
                >
                        <span>{label}</span>
                </button>
        )
}