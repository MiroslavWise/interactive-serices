"use client"

import { HistoryExchangeOffers } from "@/components/profile"

import { useResize } from "@/helpers"

export const dynamic = "force-static"
export const dynamicParams = false

export default function Default() {
  const { isTablet } = useResize()
  return !isTablet ? <HistoryExchangeOffers /> : null
}
