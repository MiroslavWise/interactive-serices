'use client'

import { type TButtonPropsDefault } from "../types";

export const ButtonDefault: TButtonPropsDefault = ({
        label,
        handleClick,
        disabled,
        classNames,
}) => {

        const click = () => {
                if (handleClick) {
                        handleClick()
                }
        }

        return (
                <button
                        className={`button-default ${disabled ? 'disabled' : ''} ${classNames ? classNames : ''}`}
                        onClick={click}
                >
                        <span>{label}</span>
                </button>
        )
}