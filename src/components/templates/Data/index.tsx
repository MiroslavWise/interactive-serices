import { ReactNode } from "react"
import dynamic from "next/dynamic"

import { EModalData } from "@/store"

import CreateNewOptionModal from "../CreateNewOptionModal"
import NewServicesBanner from "../NewServicesBanner"
// const CreateNewOptionModal = dynamic(() => import("../CreateNewOptionModal"), { ssr: false })
// const NewServicesBanner = dynamic(() => import("../NewServicesBanner"), { ssr: false })

import styleNewServiceBanner from "@/components/templates/NewServicesBanner/styles/style.module.scss"
import styleCreateNewOptionModal from "@/components/templates/CreateNewOptionModal/styles/style.module.scss"

export const DATA_MODAL: Map<EModalData, ReactNode> = new Map([
  [EModalData.NewServicesBanner, <NewServicesBanner key="::key::modal::new-services-banner" />],
  [EModalData.CreateNewOptionModal, <CreateNewOptionModal key="::key::modal::create-new-option-modal" />],
])
export const STYLE_MODAL: Map<EModalData, string> = new Map([
  [EModalData.NewServicesBanner, styleNewServiceBanner.container],
  [EModalData.CreateNewOptionModal, styleCreateNewOptionModal.container],
])

export const ID_MODAL: Map<EModalData, string> = new Map([
  [EModalData.NewServicesBanner, "container-services-banner"],
  [EModalData.CreateNewOptionModal, "container-create-option-modal"],
])
