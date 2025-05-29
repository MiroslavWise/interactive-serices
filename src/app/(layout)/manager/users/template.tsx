"use client"

import { type PropsWithChildren } from "react"

import AllowAccess from "@/components/common/AllowAccess"

import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"

//useIsAllowAccess

export default ({ children }: PropsWithChildren) => {
  const is = useIsAllowAccess("GET", "users")

  return is ? children : <AllowAccess />
}
