"use client"

import { useReducer } from "react"
import { isMobile } from "react-device-detect"

import type { IActionOffers, IStateOffers } from "@/components/profile/OffersPage/types/types"

import { ContainerHeader, ContainerOffersNow, MobileSegments } from "@/components/profile"

import styles from "@/components/profile/OffersPage/styles/style.module.scss"

const initialState: IStateOffers = {
    total: 0,
}

function reducer(_: IStateOffers, action: IActionOffers) {
    return {
        total: action?.total!,
    }
}

export default function OffersPage() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ul className={styles.wrapper}>
            {isMobile && <MobileSegments />}
            <ContainerHeader total={state.total || 0} />
            <ContainerOffersNow dispatch={dispatch} />
        </ul>
    )
}
