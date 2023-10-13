"use client"

import { useAuth } from "@/store/hooks"
import type { TButtonSuccessInBalloon } from "../types/types"

export const ButtonSuccessInBalloon: TButtonSuccessInBalloon = ({
    onClick,
}) => {
    return (
        <button
            onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onClick()
            }}
        >
            <span>Могу помочь!</span>
        </button>
    )
}
