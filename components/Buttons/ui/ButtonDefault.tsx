'use client'

import { type TButtonPropsDefault } from "../types";

export const ButtonDefault: TButtonPropsDefault = ({
        label,
        handleClick,
        disabled,
}) => {
        return (
                <button
                        className={`button-default ${disabled ? 'disabled' : ''}`}
                        onClick={handleClick}
                >
                        <span>{label}</span>
                </button>
        )
}