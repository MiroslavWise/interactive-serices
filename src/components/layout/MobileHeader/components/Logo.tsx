"use client"

import { useRouteNames } from "@/helpers/hooks/use-route-names"
import Link from "next/link"

export const Logo = () => {
  const logoAndName = useRouteNames()

  return logoAndName ? (
    <h3>{logoAndName}</h3>
  ) : (
    <Link href={{ pathname: "/" }}>
      <img src="/logo/wordmark.svg" alt="logo" width={107} height={28.3} />
    </Link>
  )
}
