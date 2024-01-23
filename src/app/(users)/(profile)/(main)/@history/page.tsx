"use client"

import { isMobile } from "react-device-detect"

import { HistoryExchangeOffers } from "@/components/profile"

export default function PageHistory() {
    return !isMobile ? <HistoryExchangeOffers /> : null
}
