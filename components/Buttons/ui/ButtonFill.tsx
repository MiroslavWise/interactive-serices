'use client'

import { type TButtonPropsFill } from "../types";

export const ButtonFill: TButtonPropsFill = ({
        label,
        classNames,
        handleClick,
        disabled,
        type,
        submit,
}) => {

        const click = () => {
                if (handleClick) {
                        handleClick
                }
        }

        return (
                <button
                        className={`button-fill ${type} ${disabled ? 'disabled' : ''} ${classNames ? classNames : ''}`}
                        onClick={click}
                        type={submit || "button"}
                >
                        <span>{label}</span>
                </button>
        )
}