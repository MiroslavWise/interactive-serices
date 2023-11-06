import type { Dispatch, FC, SetStateAction } from "react"

interface IContainer {
    isOfferOrRequest: "offer" | "request"
    setIsOfferOrRequest: Dispatch<SetStateAction<"offer" | "request">>
}

export type TContainerAboutMe = FC<IContainer>
export type TContainerTagAndButton = FC<IContainer>
export type TContainerSuggestions = FC<IContainer>
