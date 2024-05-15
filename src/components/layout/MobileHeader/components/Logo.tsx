"use client"

import Link from "next/link"

import { useRouteNames } from "@/helpers/hooks/use-route-names"

export const Logo = () => {
  const logoAndName = useRouteNames()

  return logoAndName ? (
    <h3 data-test="header-mobile-h3">{logoAndName}</h3>
  ) : (
    <Link href={{ pathname: "/" }} data-test="header-mobile-logo">
      <img src="/logo/wordmark.svg" alt="logo" width={107} height={28.3} />
    </Link>
  )
}
