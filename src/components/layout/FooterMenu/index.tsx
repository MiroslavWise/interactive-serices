"use client"

import { useMemo } from "react"
import { usePathname, useSearchParams, useParams } from "next/navigation"

import { LinkMap } from "./components/LinkMap"
import { LinkOffers } from "./components/LinkOffers"
import { LinkProfile } from "./components/LinkProfile"
import { CreateButton } from "./components/CreateButton"
import { LinkMessages } from "./components/LinkMessages"

import { cx } from "@/lib/cx"
import { useStatusAuth } from "@/helpers/use-status-auth"
import { EStatusAuth } from "@/store"

export default function FooterMenu({}) {
  const pathname = usePathname()
  const statusAuth = useStatusAuth()
  const thread = useSearchParams()?.get("thread")
  const params = useParams()

  const notActive = useMemo(
    () => (pathname.includes("messages") && !!thread) || (pathname.includes("/chat") && !!params?.id) || false,
    [pathname, params],
  )

  return (
    <footer
      className={cx(
        "fixed bottom-0 left-0 right-0 w-full h-[var(--height-mobile-footer-nav)] bg-BG-second md:hidden inline-flex z-[99] md:-z-50 py-1 border-t border-solid border-grey-stroke-light transition-transform",
        notActive && "!opacity-0 !invisible !-bottom-28",
        statusAuth === EStatusAuth.CHECK ? "-translate-y-full" : "translate-y-0",
      )}
      data-test="footer-menu-mobile"
    >
      <nav className="w-full py-0 px-0.5 flex items-center justify-between gap-1">
        <LinkMap pathname={pathname} />
        <LinkOffers pathname={pathname} />
        <CreateButton />
        <LinkMessages pathname={pathname} />
        <LinkProfile pathname={pathname} />
      </nav>
    </footer>
  )
}
