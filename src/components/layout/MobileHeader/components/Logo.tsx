"use client"

import Link from "next/link"

import { useRouteNames } from "@/helpers/hooks/use-route-names"

export const Logo = () => {
  const logoAndName = useRouteNames()

  return logoAndName ? (
    <h3 data-test="header-mobile-h3" className="text-text-primary text-xl font-semibold">
      {logoAndName}
    </h3>
  ) : (
    <Link href={{ pathname: "/" }} data-test="header-mobile-logo" className="w-20 h-[1.375rem] cursor-pointer">
      <img src="/logo/wordmark.svg" alt="logo" width={107} height={28.3} className="w-20 h-[1.375rem]" />
    </Link>
  )
}
