"use client"

import { HistoryExchangeOffers } from "@/components/profile"

import { useResize } from "@/helpers"

function RightHistory() {
  const { isTablet } = useResize()
  return !isTablet ? <HistoryExchangeOffers /> : null
}

RightHistory.displayName = "RightHistory"
export default RightHistory
