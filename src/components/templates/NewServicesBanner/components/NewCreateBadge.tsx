"use client"

import { EnumTypeProvider } from "@/types/enum"
import type { TNewCreateBadge } from "../types/types"

import { mapIconCreateOffer } from "@/utils"

import { useAddCreateModal, useOnboarding, dispatchOnboarding, dispatchModalClose } from "@/store"

import styles from "./styles/styles.module.scss"

export const NewCreateBadge: TNewCreateBadge = ({ value, label }) => {
  const type = useOnboarding(({ type }) => type)
  const visible = useOnboarding(({ visible }) => visible)
  const dispatchVisibleTypeCreateOptionals = useAddCreateModal(
    ({ dispatchVisibleTypeCreateOptionals }) => dispatchVisibleTypeCreateOptionals,
  )

  function handleType() {
    if (visible && type === value) {
      dispatchOnboarding("next")
      dispatchVisibleTypeCreateOptionals({ visible: true, type: value as EnumTypeProvider })
      dispatchModalClose()
    } else if (visible && type !== value) {
      return
    } else {
      dispatchVisibleTypeCreateOptionals({ visible: true, type: value as EnumTypeProvider })
      dispatchModalClose()
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
