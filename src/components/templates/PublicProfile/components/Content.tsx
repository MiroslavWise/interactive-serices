"use client"

import { memo } from "react"

import type { TContent } from "../types/types"

import { ContainerReviews } from "./ContainerReviews"
import { ContainerServices } from "./ContainerServices"

export const Content: TContent = memo(function Content(props) {
  const { type } = props ?? {}

  return (
    <section data-content>
      {type === "reviews" ? <ContainerReviews {...props} /> : type === "services" ? <ContainerServices {...props} /> : null}
    </section>
  )
})
