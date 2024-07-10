"use client"

import { useParams } from "next/navigation"

import ListMessages from "./ListMessages"
import HeaderAndNavigation from "./HeaderAndNavigation"

import { cx } from "@/lib/cx"

export default () => {
  const params = useParams()
  const { id } = (params as { id: string }) ?? {}

  return (
    <section
      className={cx(
        "w-full h-full max-h-screen md:rounded-[2rem] bg-BG-second flex flex-col md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] overflow-hidden",
        "max-md:!pt-[var(--height-mobile-header)] max-md:!pb-[var(--height-mobile-footer-nav)]",
        !!id && "max-md:!hidden",
      )}
    >
      <HeaderAndNavigation />
      <ListMessages />
    </section>
  )
}
