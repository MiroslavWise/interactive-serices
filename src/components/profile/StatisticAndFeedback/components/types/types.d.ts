import type { FC } from "react"

export type TBadges = FC<{
    proposals: number
    closedExchanges: number
    rating: number
}>

export type TInteractive = FC<{}>

export type TItemsReviews = FC<{}>

export type TItemsBlogMessages = FC<{}>

export type TItemsProposalsRequests = FC<{
    type: "optional-2" | "optional-3"
}>

export type TContainerServices = FC<{}>
