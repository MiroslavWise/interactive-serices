"use client"

import { type PropsWithChildren } from "react"

import { MobileChangeAbout } from "@/components/templates"

import { useResize } from "@/helpers"
import { useMobileChangeAbout } from "@/store"
import ContextProfile from "@/context/ContextProfile"

export default function LayoutProfile({ children }: PropsWithChildren) {
  const visible = useMobileChangeAbout(({ visible }) => visible)

  const { isTablet } = useResize()

  return (
    <ContextProfile>
      {isTablet ? (
        <>
          {children}
          {visible && <MobileChangeAbout />}
        </>
      ) : (
        <main className="h-full w-full overflow-hidden bg-transparent p-0 md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:pb-[1.25rem] px-0 flex flex-row justify-center z-[4] relative md:static">
          {children}
        </main>
      )}
    </ContextProfile>
  )
}
