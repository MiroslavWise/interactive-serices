"use client"

import { useEffect, useState } from "react"

import BannerPartner from "../BannerPartner"
import HeaderBannerHelp from "../HeaderBannerHelp"

import { useBanner, useMobileSearchCategory, useSearchMobile } from "@/store"

function BannerMainPage() {
  const visible = useBanner(({ visible }) => visible)
  const visibleSearchMobile = useSearchMobile(({ visible }) => visible)
  const visibleSearchCategory = useMobileSearchCategory(({ visible }) => visible)
  const [state, setState] = useState(true)

  useEffect(() => {
    if (visible) {
      const interval = setInterval(() => {
        setState((_) => !_)
      }, 15 * 1000)

      return () => clearInterval(interval)
    }
  }, [visible])

  if (!visible || visibleSearchCategory || visibleSearchMobile) return null

  return (
    <div className="fixed h-[var(--height-banner)] overflow-hidden left-0 right-0 z-[70] md:top-[var(--height-header-nav-bar)] top-[var(--height-mobile-header)]">
      <BannerPartner is={state} />
      <HeaderBannerHelp is={state} />
    </div>
  )
}

BannerMainPage.displayName = "BannerMainPage"
export default BannerMainPage
