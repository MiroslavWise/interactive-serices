"use client"

import { HistoryExchangeOffers } from "@/components/profile"

import { useResize } from "@/helpers"

export default function PageHistory() {
  const { isTablet } = useResize()

  return !isTablet ? <HistoryExchangeOffers /> : null
}
