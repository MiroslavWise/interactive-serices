"use client"

import Link from "next/link"

import { useAuth } from "@/store"

const TITLE = "Компания"
const URL = "/company"

function LinkCompany({ pathname }: { pathname: string }) {
  const is = pathname?.includes(URL)
  const user = useAuth(({ user }) => user)

  const { company } = user ?? {}

  const isCompany = !!company?.id

  return isCompany ? (
    <Link
      href={{
        pathname: URL,
      }}
      title={TITLE}
      aria-label={TITLE}
      aria-labelledby={TITLE}
      data-active={is}
    >
      <span>{TITLE}</span>
    </Link>
  ) : null
}

LinkCompany.displayName = "LinkCompany"
export default LinkCompany
