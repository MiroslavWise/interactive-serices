"use client"

import { HistoryExchangeOffers } from "@/components/profile"

import { useResize } from "@/helpers"

export default function Default() {
  const { isTablet } = useResize()
  return !isTablet ? <HistoryExchangeOffers /> : null
}
