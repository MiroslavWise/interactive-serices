import { ReactNode } from "react"

import { EModalData } from "@/store"

import { NewServicesBanner } from "../NewServicesBanner"

import styleNewServiceBanner from "@/components/templates/NewServicesBanner/styles/style.module.scss"

export const DATA_MODAL: Map<EModalData, ReactNode> = new Map([
  [EModalData.NewServicesBanner, <NewServicesBanner key="::key::modal::new-services-banner" />],
])
export const STYLE_MODAL: Map<EModalData, string> = new Map([[EModalData.NewServicesBanner, styleNewServiceBanner.container]])

export const ID_MODAL: Map<EModalData, string> = new Map([[EModalData.NewServicesBanner, "container-services-banner"]])
