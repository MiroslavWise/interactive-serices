"use client"

import { EnumTypeProvider } from "@/types/enum"
import type { TNewCreateBadge } from "../types/types"

import { mapIconCreateOffer } from "@/utils"

import { useOnboarding, dispatchOnboarding, openCreateOffers, dispatchModal, EModalData } from "@/store"

import styles from "./styles/styles.module.scss"

export const NewCreateBadge: TNewCreateBadge = ({ value, label }) => {
  const type = useOnboarding(({ type }) => type)
  const visible = useOnboarding(({ visible }) => visible)

  function handleType() {
    if (visible && type === value) {
      dispatchOnboarding("next")
      openCreateOffers(value as EnumTypeProvider)
      dispatchModal(EModalData.CreateNewOptionModal)
    } else if (visible && type !== value) {
      return
    } else {
      openCreateOffers(value as EnumTypeProvider)
      dispatchModal(EModalData.CreateNewOptionModal)
    }
  }

  return (
    <li
      className={styles.containerLiNew}
      onClick={handleType}
      data-onboarding={visible && type === value}
      id={`li-${value}-create`}
      data-not={visible && type !== value}
    >
      {mapIconCreateOffer.has(value) ? mapIconCreateOffer.get(value) : null}
      <p>{label}</p>
    </li>
  )
}
