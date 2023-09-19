import { TProviderOffer } from "@/services/types/general"
import type { Dispatch, FC } from "react"

interface ILabelAndInput {
    title: string
    placeholder: string
    text: string
    setText: Dispatch<string>
}

interface ILabelAndSelectOffersCategories {
    title: string
    placeholder: string
    value: { id: number; slug: TProviderOffer }
    setValue: Dispatch<{ id: number; slug: TProviderOffer }>
}

export type TLabelAndInput = FC<ILabelAndInput>
export type TLabelAndSelectOffersCategories =
    FC<ILabelAndSelectOffersCategories>
