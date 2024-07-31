"use client"

import { useState } from "react"

import { EnumStatusBarter } from "@/types/enum"
import { type ISegmentValues } from "@/components/common/Segments/types"

import { Header } from "./components/Header"
import { SentenceCards } from "./components/SentenceCards"

import { SEGMENTS } from "./constants"

export const HistoryExchangeOffers = ({}) => {
  const [value, setValue] = useState<ISegmentValues<EnumStatusBarter>>(SEGMENTS[0])

  return (
    <aside className="fixed w-full max-w-[24.375rem] hidden md:flex flex-col gap-6 bg-BG-second z-[2] overflow-hidden rounded-[2rem] top-[calc(var(--height-header-nav-bar)_+_1.5rem)] right-6 bottom-6 h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] pt-5">
      <Header {...{ value, setValue }} />
      <SentenceCards {...{ value }} />
    </aside>
  )
}
