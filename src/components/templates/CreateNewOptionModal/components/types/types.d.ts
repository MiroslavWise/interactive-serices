import { TProviderOffer } from "@/services/types/general"
import type { Dispatch, DispatchWithoutAction, FC } from "react"

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

interface iFooterButtons {
    disabled: boolean
    handleNext: DispatchWithoutAction
    handleExit: DispatchWithoutAction
}

interface IImagesUploadInput {
    files: File[]
    setFile: Dispatch<File>
    selected: string[]
    setSelectedFile: Dispatch<string>
}

interface IAddressDescription {
    address: string | null
}

export type TLabelAndInput = FC<ILabelAndInput>
export type TLabelAndSelectOffersCategories =
    FC<ILabelAndSelectOffersCategories>
export type TFooterButtons = FC<IFooterButtons>
export type TImagesUploadInput = FC<IImagesUploadInput>
export type TAddressDescription = FC<IAddressDescription>
