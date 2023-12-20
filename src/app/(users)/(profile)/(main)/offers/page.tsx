"use client"

import { useReducer } from "react"
import { isMobile } from "react-device-detect"

import type { IActionOffers, IStateOffers } from "@/components/profile/OffersPage/types/types"

import { ContainerHeader, ContainerOffersNow, MobileSegments } from "@/components/profile"

import styles from "@/components/profile/OffersPage/styles/style.module.scss"

const initialState: IStateOffers = {
    isToMe: true,
    total: 0,
}

function reducer(state: IStateOffers, action: IActionOffers) {
    const getIsToMe = typeof action.isToMe === "undefined" ? state.isToMe : action.isToMe
    const getTotal = typeof action.total === "undefined" ? state.total : action.total
    return {
        isToMe: getIsToMe,
        total: getTotal,
    }
}

export default function OffersPage() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ul className={isMobile ? styles.mobileOffersPage : styles.containerOffersPage}>
            {isMobile && <MobileSegments />}
            <ContainerHeader total={state.total || 0} dispatch={dispatch} isToMe={state.isToMe} />
            <ContainerOffersNow isToMe={state.isToMe} dispatch={dispatch} />
        </ul>
    )
}
