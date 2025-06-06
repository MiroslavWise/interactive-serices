"use client"

import { type PropsWithChildren } from "react"

import AllowAccess from "@/components/common/AllowAccess"

import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"

export default ({ children }: PropsWithChildren) => {
  const is = useIsAllowAccess("GET", "offers")

  return is ? children : <AllowAccess />
}
