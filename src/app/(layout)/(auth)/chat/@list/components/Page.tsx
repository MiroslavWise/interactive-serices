"use client"

import dynamic from "next/dynamic"
import { useParams } from "next/navigation"

const ListMessages = dynamic(() => import("./ListMessages"), {
  ssr: false,
})

import { cx } from "@/lib/cx"

export default () => {
  const params = useParams()
  const { id } = (params as { id: string }) ?? {}

  return (
    <section
      className={cx(
        "w-full h-full max-h-screen md:rounded-2 bg-BG-second flex flex-col md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] overflow-hidden",
        "max-md:h-dvh max-md:!pt-[--height-mobile-header]",
        !!id && "max-md:!hidden",
        "bottom-internal-shadow",
      )}
    >
      <ListMessages />
    </section>
  )
}
