"use client"

import Link from "next/link"
import { useMemo } from "react"

import { ETitleRole } from "@/services/roles/types"

import { useAuth } from "@/store"

const TITLE = "Модерация"
const URL = "/manager"

function LinkModerator({ pathname }: { pathname: string }) {
  const is = pathname?.includes(URL)
  const user = useAuth(({ user }) => user)

  const { roles = [] } = user ?? {}

  const isModerator = useMemo(() => {
    for (const item of roles) {
      if ([ETitleRole.Manager, ETitleRole.SuperAdmin].includes(item.title)) return true
    }

    return false
  }, [roles])

  return isModerator ? (
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

LinkModerator.displayName = "LinkModerator"
export default LinkModerator
